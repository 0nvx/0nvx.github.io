/* ============================================================
   data.js — All site content (articles + writeups)
   Edit these arrays to add, remove, or update your posts.
   ============================================================ */

const ARTICLES = [
  {
    id: "anatomy-of-a-heap-overflow",
    title: "Anatomy of a Heap Overflow: Exploiting malloc()",
    date: "Oct 12, 2023",
    tags: ["Binary", "Pwn", "Exploit Development"],
    excerpt: "A deep dive into how memory allocation works in libc and how to leverage use-after-free vulnerabilities to gain arbitrary code execution.",
    readTime: "12 min read",
    content: `<h2>Introduction</h2>
<p>Understanding how the heap works is essential for modern exploit development. While stack overflows are becoming less common due to mitigations like stack canaries, heap exploitation remains a critical skill.</p>
<p>This article breaks down the mechanics of <code>malloc()</code> and <code>free()</code>, exploring how metadata is stored and how corrupting it can lead to arbitrary memory overwrites.</p>
<h2>The Heap Layout</h2>
<p>When memory is allocated via <code>malloc</code>, glibc allocates a "chunk". A chunk consists of a header and user data:</p>
<pre><code>struct malloc_chunk {
  INTERNAL_SIZE_T      mchunk_prev_size;
  INTERNAL_SIZE_T      mchunk_size;
  struct malloc_chunk* fd;
  struct malloc_chunk* bk;
};</code></pre>
<h2>Use-After-Free (UAF)</h2>
<p>A use-after-free occurs when a program continues to use a pointer after it has been freed. By carefully crafting allocations, an attacker can reclaim freed memory with controlled data.</p>
<h2>Conclusion</h2>
<p>Heap exploitation requires precision and an intimate understanding of memory allocators. Practice with tools like pwntools and GDB-GEF to build muscle memory.</p>`
  },
  {
    id: "web-cache-deception",
    title: "Weaponizing Web Cache Deception",
    date: "Sep 05, 2023",
    tags: ["Web", "Bug Bounty", "Architecture"],
    excerpt: "Exploring real-world scenarios where misconfigured CDN rules allow attackers to steal sensitive user information by manipulating file extensions.",
    readTime: "8 min read",
    content: `<h2>Introduction</h2>
<p>Web Cache Deception (WCD) occurs when an attacker tricks a caching server (like Cloudflare or Akamai) into storing a sensitive, user-specific page that is meant to be dynamic.</p>
<h2>The Attack</h2>
<p>By appending a static-looking suffix such as <code>.css</code> or <code>.jpg</code> to a URL pointing to a private page, CDN rules may cache the response. A subsequent visit from the attacker retrieves the cached victim response.</p>
<h2>Real-World Impact</h2>
<p>This class of vulnerability has led to account takeovers, PII leaks, and session token exposure in major platforms during bug-bounty programs.</p>
<h2>Mitigation</h2>
<p>Set proper <code>Cache-Control: no-store</code> headers on all authenticated endpoints and validate CDN cache rules against URL path normalization.</p>`
  },
  {
    id: "ctf-methodology",
    title: "My Standard CTF Methodology",
    date: "Aug 22, 2023",
    tags: ["CTF", "Methodology"],
    excerpt: "A systematic approach to tackling CTF challenges, managing time, and taking effective notes during competitions.",
    readTime: "6 min read",
    content: `<h2>Preparation</h2>
<p>Before the CTF starts, ensure your environment is ready. A clean VM, updated tools, and a note-taking setup are crucial for efficient competition performance.</p>
<h2>Triage Phase</h2>
<p>Spend the first 30 minutes scanning all challenges. Categorize them by type and difficulty. Pick the lowest-hanging fruit first to get points on the board.</p>
<h2>Note Taking</h2>
<p>Use a structured format: challenge name, category, points, observations, attempted approaches, and final solution. Obsidian or a simple markdown file works great.</p>
<h2>Time Management</h2>
<p>Set a 2-hour time-box per hard challenge. If you're stuck, pivot to another and return with fresh eyes. Avoid rabbit holes at all costs.</p>`
  },
  {
    id: "advanced-osint-techniques",
    title: "Advanced OSINT: Tracking Corporate Infrastructure",
    date: "Jul 14, 2023",
    tags: ["OSINT", "Recon"],
    excerpt: "Moving beyond basic Google dorks. How to correlate ASN data, SSL certificates, and historical DNS records to map out entire organizations.",
    readTime: "10 min read",
    content: `<h2>The Recon Phase</h2>
<p>When approaching a large target, finding the edge of their network is often the hardest part. Most organizations have sprawling infrastructure spread across multiple ASNs.</p>
<h2>ASN Enumeration</h2>
<p>Start with <code>whois</code> and tools like <code>bgp.he.net</code> to identify all IP ranges owned by the target organization. This gives you a map of their entire internet footprint.</p>
<h2>SSL Certificate Correlation</h2>
<p>Certificate Transparency logs (crt.sh) reveal every subdomain that has ever had a certificate issued. This often exposes staging, internal, and forgotten infrastructure.</p>
<h2>Historical DNS</h2>
<p>Services like SecurityTrails and PassiveDNS show historical IP resolutions. Targets often expose their origin IPs before moving behind a CDN.</p>`
  }
];

const WRITEUPS = [
  {
    id: "defcon-2023-baby-pwn",
    challenge: "Baby Pwn",
    ctf: "DEF CON Quals 2023",
    difficulty: "Medium",
    category: "Pwn",
    tools: ["pwntools", "GDB", "Ghidra"],
    description: "A classic stack buffer overflow with a twist: ASLR is enabled, but there's an information leak in the greeting function.",
    flag: "flag{leaking_libc_like_its_2015}",
    solution: `<h2>Challenge Description</h2>
<p>We are given a 64-bit ELF binary and its corresponding libc version.</p>
<h2>Solution</h2>
<ol>
  <li><strong>Information Leak</strong>: The program asks for our name and prints it back using <code>printf(name)</code>. This is a format string vulnerability.</li>
  <li><strong>Bypassing ASLR</strong>: We use <code>%p</code> to leak addresses from the stack, finding the libc base address.</li>
  <li><strong>Exploitation</strong>: Overwrite the return address with a ROP chain that calls <code>system("/bin/sh")</code>.</li>
</ol>
<pre><code>from pwn import *

p = process('./baby_pwn')
p.sendline(b'%p.%p.%p.%p.%p.%p')
leak = p.recvline()
# parse libc base from leak
libc_base = int(leak.split(b'.')[5], 16) - 0x21bf7
log.success(f"libc @ {hex(libc_base)}")
</code></pre>
<h2>Tools Used</h2>
<ul>
  <li>pwntools</li>
  <li>GDB (GEF)</li>
  <li>Ghidra for binary analysis</li>
</ul>`
  },
  {
    id: "hackthebox-cyber-apocalypse-web",
    challenge: "Intergalactic Tracker",
    ctf: "Cyber Apocalypse 2023",
    difficulty: "Hard",
    category: "Web",
    tools: ["Burp Suite", "Python"],
    description: "A complex web challenge involving Server-Side Template Injection (SSTI) that leads to Remote Code Execution (RCE) in a restricted environment.",
    flag: "HTB{t3mpl4t3s_4r3_d4ng3r0us}",
    solution: `<h2>Challenge Description</h2>
<p>A web application built with Flask that allows users to create custom tracking dashboards.</p>
<h2>Solution</h2>
<ol>
  <li>Identify Jinja2 SSTI in the dashboard naming feature by injecting <code>{{7*7}}</code>.</li>
  <li>Bypass WAF filters that block <code>_</code> and <code>.</code> using string concatenation tricks.</li>
  <li>Achieve RCE with <code>{{request|attr('application')|attr('\x5f\x5fglobals\x5f\x5f')}}</code> chain.</li>
</ol>
<h2>Key Takeaway</h2>
<p>Always test for SSTI in any field that gets rendered back to the user, especially in Python web frameworks.</p>`
  },
  {
    id: "flareon-2022-chal1",
    challenge: "Flaredle",
    ctf: "Flare-On 9",
    difficulty: "Easy",
    category: "Reverse Engineering",
    tools: ["Browser DevTools"],
    description: "A Wordle clone built in JavaScript where the flag is the winning word.",
    flag: "flareon_is_fun@flare-on.com",
    solution: `<h2>Challenge Description</h2>
<p>A simple Wordle clone hosted as a static web page.</p>
<h2>Solution</h2>
<p>Open the browser's Developer Tools → Sources tab. Find <code>words.js</code>. The winning word is hardcoded as the first element of the <code>WORDS</code> array.</p>
<pre><code>// words.js (excerpt)
const WORDS = ["flareon_is_fun@flare-on.com", ...];
</code></pre>
<p>Enter the word to receive the flag. No reversing needed — just reading JavaScript.</p>`
  },
  {
    id: "csaw-2023-crypto",
    challenge: "RSA Roulette",
    ctf: "CSAW CTF 2023",
    difficulty: "Medium",
    category: "Crypto",
    tools: ["SageMath", "Python"],
    description: "An RSA implementation where the primes p and q are generated using a flawed random number generator.",
    flag: "csaw{rng_n3v3r_f0rg3ts}",
    solution: `<h2>Challenge Description</h2>
<p>RSA encryption, but the random number generator is predictable due to a fixed seed.</p>
<h2>Solution</h2>
<ol>
  <li>Analyse the RNG — it uses Python's <code>random</code> module seeded with the current second timestamp.</li>
  <li>Bruteforce the seed over a 60-second window around the challenge release time.</li>
  <li>Regenerate <code>p</code> and <code>q</code>, compute <code>d</code>, and decrypt the ciphertext.</li>
</ol>
<pre><code>import random
from Crypto.Util.number import inverse

for seed in range(start_time, start_time + 60):
    random.seed(seed)
    p = random.getrandbits(512)
    # ... check if n == p*q
</code></pre>`
  },
  {
    id: "osint-geint",
    challenge: "Where am I?",
    ctf: "SANS Holiday Hack",
    difficulty: "Easy",
    category: "OSINT",
    tools: ["Google Earth", "SunCalc"],
    description: "Find the exact coordinates of a location based on a single photograph showing a distinct mountain range and shadows.",
    flag: "SANS{34.0522,-118.2437}",
    solution: `<h2>Solution</h2>
<ol>
  <li>Upload the photo to <strong>SunCalc.org</strong> and use the shadow angle to determine approximate time of day and latitude.</li>
  <li>Use the mountain silhouette profile and match it against Google Earth's 3D terrain view.</li>
  <li>Cross-reference with the shadow direction to pin the exact viewpoint coordinates.</li>
</ol>
<p>The location was a viewpoint in Los Angeles, CA looking north toward the San Gabriel Mountains.</p>`
  }
];
