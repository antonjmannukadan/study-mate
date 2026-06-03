import { useState, useMemo } from "react";

const PAPERS = ["Dec 2022","Jun 2023","Jun 2024","Dec 2024","Jun 2025","Dec 2025"];

const questions = [
  {
    n:1, hot:true, cat:"networks",
    unit:"Mobile Networks",
    text:"What is GPRS? Explain its features and list the services offered by it.",
    papers:["Dec 2022","Dec 2024"],
    freq:5,
    answer:`**GPRS (General Packet Radio Service)** is a packet-oriented mobile data standard on the 2G and 3G cellular communication network's global system for mobile communications (GSM). It provides data rates from 56–114 kbps.

**Features of GPRS:**
- Always-on connectivity (no dial-up required)
- Packet switching instead of circuit switching
- Efficient use of radio spectrum (shares channels among users)
- IP-based architecture supporting internet services
- Supports both SMS and data simultaneously
- Billing based on data volume, not connection time

**Services offered by GPRS:**
- Web browsing and internet access
- MMS (Multimedia Messaging Service)
- Email services on mobile
- Location-based services
- Push-to-talk and instant messaging
- Corporate VPN access
- WAP (Wireless Application Protocol) services
- Streaming audio/video (limited)

**GPRS Architecture Components:** Mobile Station (MS), Base Station Subsystem (BSS), SGSN (Serving GPRS Support Node), GGSN (Gateway GPRS Support Node), and HLR/VLR databases.`
  },
  {
    n:2, hot:true, cat:"networks",
    unit:"Mobile Networks",
    text:"What is a cellular network? Explain its various components with a neat diagram.",
    papers:["Dec 2022","Dec 2025"],
    freq:5,
    answer:`**Cellular Network** is a radio network distributed over land areas called cells, each served by at least one fixed-location transceiver (base station). Adjacent cells use different frequencies to avoid interference, but non-adjacent cells may reuse the same frequency.

**Key Components:**

1. **Mobile Station (MS):** The end-user device (mobile phone, tablet). Contains SIM card for subscriber identity.

2. **Base Transceiver Station (BTS):** Handles radio communication with MS. Each cell has one BTS.

3. **Base Station Controller (BSC):** Manages multiple BTS units. Controls handover, power levels, and radio channels.

4. **Mobile Switching Center (MSC):** Core of the network. Routes calls, manages handovers, interfaces with PSTN.

5. **Home Location Register (HLR):** Database storing subscriber info and current location.

6. **Visitor Location Register (VLR):** Temporary database of subscribers currently in MSC's service area.

7. **Authentication Center (AuC):** Provides security by authenticating subscribers.

8. **Equipment Identity Register (EIR):** Database of mobile device identities (IMEI).

**Frequency Reuse:** Cells are grouped into clusters (typically 7-cell clusters). Same frequencies reused in non-adjacent clusters to increase capacity while minimizing interference.

**Handover:** When a mobile user moves between cells, the call is transferred from one BTS to another seamlessly — this is called handover/handoff.`
  },
  {
    n:3, hot:true, cat:"arch",
    unit:"Architecture",
    text:"Explain mobile computing architecture with the help of a diagram.",
    papers:["Dec 2022","Dec 2024","Dec 2025"],
    freq:6,
    answer:`**Mobile Computing Architecture** describes the structural framework that enables computing on mobile devices connected to wireless networks.

**Three-Tier Architecture:**

**Tier 1 — Mobile Client (Presentation Layer):**
- Mobile devices (smartphones, tablets, laptops)
- Runs mobile OS (Android, iOS, Windows Mobile)
- Handles user interface and local processing
- Stores data locally in device databases
- Communicates via wireless protocols

**Tier 2 — Application Server (Logic Layer):**
- Business logic processing
- Handles requests from mobile clients
- Manages sessions and transactions
- Acts as middleware between client and data
- Examples: Web servers, application servers

**Tier 3 — Backend/Data Layer:**
- Databases (RDBMS, NoSQL)
- Enterprise systems, legacy systems
- Internet/Intranet resources
- Cloud storage and services

**Communication Infrastructure:**
- Wireless Networks: GSM, GPRS, 3G, 4G LTE, 5G, Wi-Fi, Bluetooth
- Base Stations and Access Points connect mobile clients
- Mobile IP handles routing for moving devices
- Gateways bridge wireless and wired networks

**Key Design Considerations:** Limited battery, bandwidth variability, intermittent connectivity, security, device heterogeneity, and context-awareness (location, time, user preferences).`
  },
  {
    n:4, hot:true, cat:"networks",
    unit:"Mobile Networks",
    text:"What is GSM technology? Explain its features, cells, advantages and disadvantages.",
    papers:["Jun 2023","Dec 2024"],
    freq:4,
    answer:`**GSM (Global System for Mobile Communications)** is a standard for second-generation (2G) digital cellular networks. Developed by ETSI, it uses TDMA (Time Division Multiple Access) and operates in 900 MHz and 1800 MHz bands.

**Features of GSM:**
- Digital transmission (voice encoded digitally)
- TDMA technology — up to 8 users per radio channel
- SIM card-based subscriber identity
- International roaming support
- SMS support
- Encryption for security (A5/1 algorithm)
- Data services: 9.6 kbps (circuit-switched CSD)

**Cells in GSM:**
- **Macro cells:** Large coverage, rural areas (radius 35 km)
- **Micro cells:** Urban areas (radius 1 km)
- **Pico cells:** Indoor, buildings (radius 100 m)
- **Umbrella cells:** Cover shadowed regions of other cells

**Advantages:**
- Global standardization — works in 200+ countries
- Good voice quality with digital encoding
- Secure communication with encryption
- SMS capability
- Efficient spectrum usage via TDMA
- Wide infrastructure already deployed

**Disadvantages:**
- Limited data rates (9.6 kbps for basic GSM)
- Susceptible to congestion in high-density areas
- TDMA introduces latency
- Vulnerable to IMSI catchers (security concern)
- Requires significant infrastructure investment`
  },
  {
    n:5, hot:true, cat:"os",
    unit:"Mobile OS & Platforms",
    text:"Draw and explain Android architecture with a neat diagram.",
    papers:["Jun 2023"],
    freq:4,
    answer:`**Android Architecture** is a software stack with 5 main layers:

**Layer 1 — Linux Kernel (Bottom):**
- Foundation of Android OS
- Provides hardware abstraction
- Drivers: camera, keypad, display, audio, Wi-Fi, Bluetooth
- Memory management, process management, security
- Power management

**Layer 2 — Hardware Abstraction Layer (HAL):**
- Standard interfaces for hardware components
- Allows upper layers to access hardware without kernel-level code
- Multiple HAL modules for each hardware type

**Layer 3 — Android Runtime (ART) & Native Libraries:**
- **ART:** Replaces Dalvik VM; uses AOT (Ahead-of-Time) compilation for faster execution
- **Native C/C++ Libraries:** OpenGL ES (graphics), SQLite (database), WebKit (browser engine), libc, SSL

**Layer 4 — Java API Framework:**
- Building blocks for Android applications
- **Activity Manager:** Manages lifecycle of apps
- **Content Providers:** Share data between apps
- **Resource Manager:** Access to non-code resources (layouts, strings)
- **Notification Manager:** Status bar notifications
- **Window Manager, Location Manager, Package Manager**

**Layer 5 — System Apps (Top):**
- Pre-installed apps: Phone, Contacts, Browser, Camera, SMS
- Plus user-installed apps
- All apps written using Java/Kotlin API framework`
  },
  {
    n:6, hot:true, cat:"apps",
    unit:"Apps & Development",
    text:"Explain J2EE architecture and J2ME components.",
    papers:["Dec 2022","Jun 2023","Jun 2024"],
    freq:5,
    answer:`**J2EE (Java 2 Enterprise Edition) Architecture:**

J2EE provides a multi-tier distributed application model with reusable components.

**J2EE Tiers:**
1. **Client Tier:** Web browsers, Java applets, standalone apps
2. **Web Tier:** JSP (JavaServer Pages), Servlets — generates dynamic web content
3. **Business Tier:** EJBs (Enterprise JavaBeans) — business logic (Session beans, Entity beans, Message-driven beans)
4. **EIS Tier (Enterprise Information System):** Databases, legacy systems, ERP systems

**J2EE Container Types:** Web Container (runs JSP/Servlets), EJB Container (runs Enterprise Beans), Application Client Container, Applet Container.

**J2EE Key APIs:** JDBC, JMS (messaging), JNDI (naming), JavaMail, JAX-RPC (web services), JTA (transactions).

---

**J2ME (Java 2 Micro Edition) Components:**

J2ME is the Java platform for mobile/embedded devices.

**J2ME Architecture:**
- **Configuration:** Defines JVM and core API set
  - **CLDC (Connected Limited Device Configuration):** Low-end devices, minimal memory
  - **CDC (Connected Device Configuration):** Higher-end devices
- **Profile:** Adds functionality on top of configuration
  - **MIDP (Mobile Information Device Profile):** For phones — built on CLDC. Provides UI, network, storage
  - **PDA Profile:** For PDAs
- **MIDlets:** J2ME applications that run on MIDP. Lifecycle: Pause, Active, Destroyed

**Key J2ME APIs:** LCDUI (UI), RecordStore (storage), javax.microedition.io (networking)`
  },
  {
    n:7, hot:true, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"What are Ad-hoc networks? Explain their features and advantages.",
    papers:["Dec 2022","Jun 2024","Dec 2025"],
    freq:5,
    answer:`**Ad-hoc Networks (Mobile Ad-hoc Networks - MANets)** are self-configuring, infrastructure-less networks of mobile devices connected wirelessly. No fixed base station — each node acts as both host and router.

**Features of Ad-hoc Networks:**
- **Self-organizing:** No prior network infrastructure required
- **Dynamic topology:** Nodes move freely; topology changes constantly
- **Multi-hop routing:** Data can be relayed through multiple intermediate nodes
- **Decentralized:** No central administration or control
- **Autonomous nodes:** Each node is independent
- **Limited bandwidth:** Wireless links have limited capacity
- **Energy constraints:** Battery-powered nodes

**Types:**
- **MANET (Mobile Ad-hoc Network):** General mobile nodes
- **VANET (Vehicular Ad-hoc Network):** Vehicles communicating
- **WSN (Wireless Sensor Network):** Sensor nodes

**Advantages:**
- Quick deployment — no infrastructure needed
- Ideal for disaster recovery, military operations, emergency services
- Highly flexible and scalable
- Cost-effective (no base station investment)
- Tolerant to single point failure

**Disadvantages:**
- Security vulnerabilities (no central authentication)
- Limited bandwidth shared among all nodes
- Routing overhead due to dynamic topology
- Battery consumption higher (acts as router too)
- Interference and packet loss more common`
  },
  {
    n:8, hot:true, cat:"networks",
    unit:"Mobile Networks",
    text:"What is LTE? Explain its features and how it differs from earlier generations.",
    papers:["Dec 2022"],
    freq:3,
    answer:`**LTE (Long-Term Evolution)** is a standard for high-speed wireless broadband communication, marketed as 4G LTE. Developed by 3GPP, it succeeds UMTS/HSPA (3G).

**Features of LTE:**
- **High data rates:** Download up to 100 Mbps, upload up to 50 Mbps (LTE); up to 1 Gbps for LTE-Advanced
- **Low latency:** ~10 ms (vs 100+ ms for 3G)
- **All-IP architecture:** Voice and data both over IP (VoIP)
- **Wider bandwidth:** Supports 1.4 MHz to 20 MHz channels
- **OFDMA (Orthogonal Frequency Division Multiple Access):** Downlink access method
- **SC-FDMA:** Uplink access method (efficient battery use)
- **MIMO (Multiple Input Multiple Output):** Multiple antennas for higher throughput
- **Flat architecture:** Fewer network nodes, reduced cost and complexity
- **Backward compatibility:** Supports 2G/3G fallback

**Comparison with earlier generations:**
| Generation | Technology | Data Speed |
|---|---|---|
| 2G | GSM/GPRS | 9.6–114 kbps |
| 3G | UMTS/HSPA | 384 kbps–14 Mbps |
| 4G LTE | OFDMA/MIMO | 100 Mbps–1 Gbps |

**LTE vs 3G:** LTE uses OFDMA instead of WCDMA, all-IP vs mixed circuit/packet, significantly lower latency, and much higher spectral efficiency.`
  },
  {
    n:9, hot:true, cat:"os",
    unit:"Mobile OS & Platforms",
    text:"Explain the architecture of iOS with its key layers.",
    papers:["Jun 2024"],
    freq:3,
    answer:`**iOS Architecture** is organized into 4 abstraction layers from hardware to applications.

**Layer 1 — Core OS (Bottom):**
- Direct hardware interaction
- Security framework, encryption, Bluetooth, ExternalAccessory
- Grand Central Dispatch (GCD) for concurrency
- Low-level UNIX-based interfaces

**Layer 2 — Core Services:**
- Foundational services used by higher layers
- **Core Foundation:** Fundamental data types, collections, strings
- **Core Data:** Object graph and persistence framework
- **Core Location:** GPS and location services
- **StoreKit:** In-App Purchase
- **iCloud Storage**, **Core Motion**, **Address Book**

**Layer 3 — Media Layer:**
- Graphics and multimedia
- **Core Graphics:** 2D rendering (Quartz)
- **OpenGL ES:** 3D graphics
- **Core Animation:** Smooth animations
- **AVFoundation:** Audio/video playback and recording
- **Core Image:** Image processing

**Layer 4 — Cocoa Touch (Top):**
- Highest-level layer; directly used by app developers
- **UIKit:** UI components (buttons, tables, views, gestures)
- **MapKit:** Maps integration
- **EventKit:** Calendar and reminders
- **Message UI, Push Notifications, Game Kit**

**iOS Key Characteristics:**
- Closed ecosystem — apps from App Store only
- Objective-C and Swift programming languages
- Sandbox security model — apps isolated from each other
- Touch ID / Face ID biometric authentication`
  },
  {
    n:10, hot:true, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"Explain Frequency Division Multiplexing (FDM) — its advantages, disadvantages and applications.",
    papers:["Dec 2022","Jun 2025"],
    freq:4,
    answer:`**FDM (Frequency Division Multiplexing)** is a technique where the total available bandwidth is divided into smaller frequency bands, and each signal is assigned a unique frequency band for transmission. All signals are transmitted simultaneously.

**How FDM works:**
- Each input signal modulates a different carrier frequency
- Guard bands separate adjacent channels to prevent interference
- All modulated signals are combined and transmitted simultaneously
- At receiver, bandpass filters separate each channel

**Advantages:**
- No time-wasting synchronization required
- Simple to implement
- Multiple signals transmitted simultaneously
- No propagation delay issues
- Works well for continuous signals (analog)

**Disadvantages:**
- Bandwidth wastage due to guard bands
- Susceptible to inter-modulation distortion
- Not efficient for bursty digital data
- Cross-talk between adjacent channels possible
- Requires precise bandpass filters

**Applications:**
- Cable TV (each channel assigned a frequency band)
- AM/FM radio broadcasting
- Telephone systems (traditional PSTN)
- ADSL broadband (upstream and downstream on different frequencies)
- First-generation cellular networks (1G)
- DSL internet connections`
  },
  {
    n:11, hot:true, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"Explain Time Division Multiplexing (TDM) — its advantages, disadvantages and applications.",
    papers:["Jun 2023"],
    freq:3,
    answer:`**TDM (Time Division Multiplexing)** is a technique where multiple signals share the same channel by dividing the transmission time into slots. Each signal gets the full bandwidth but only for a short time slot.

**How TDM works:**
- Time is divided into fixed-length slots (frames)
- Each input source is assigned one or more time slots per frame
- At receiver, the signal is de-multiplexed based on time slots
- **Synchronous TDM:** Fixed slots assigned even if source has no data (wastes bandwidth)
- **Statistical TDM (Asynchronous):** Slots allocated dynamically only when data is available

**Advantages:**
- Simple synchronization — digital-friendly
- No inter-channel interference
- Efficient for digital data
- Equal sharing of bandwidth
- Easy to add/remove channels
- No guard bands needed

**Disadvantages:**
- Synchronous TDM wastes bandwidth during idle periods
- Requires synchronization between transmitter and receiver
- Not ideal for varying traffic loads
- Propagation delay introduced

**Applications:**
- GSM (2G cellular) — uses TDMA with 8 time slots per channel
- T1/E1 telephone trunk lines
- ISDN (Integrated Services Digital Network)
- PCM (Pulse Code Modulation) telephony
- Digital satellite communications`
  },
  {
    n:12, hot:true, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"Explain Wavelength Division Multiplexing (WDM) — advantages, disadvantages and applications.",
    papers:["Jun 2024","Dec 2025","Jun 2025"],
    freq:5,
    answer:`**WDM (Wavelength Division Multiplexing)** is a fiber-optic technology that multiplexes multiple optical carrier signals on a single fiber by using different wavelengths (colors) of laser light. It is the optical equivalent of FDM.

**Types of WDM:**
- **CWDM (Coarse WDM):** 18 channels, 20 nm channel spacing, less expensive
- **DWDM (Dense WDM):** 80+ channels, 0.8 nm spacing, very high capacity, long-distance
- **UDWDM:** Ultra-dense for maximum channels

**Advantages:**
- Extremely high bandwidth (terabits per second)
- Multiple independent data streams on single fiber
- Transparent to data rates and formats
- Easy capacity expansion (add wavelengths)
- Cost-effective — uses existing fiber infrastructure
- Low signal degradation

**Disadvantages:**
- Expensive equipment (lasers, multiplexers, amplifiers)
- Complex network management
- Chromatic dispersion limits distance
- Non-linear effects at high power levels
- Crosstalk between channels possible

**Applications:**
- Long-haul optical backbone networks (internet backbone)
- Metropolitan Area Networks (MANs)
- Cable television hybrid fiber-coaxial networks
- Submarine cable systems (trans-oceanic)
- Data center interconnects
- 5G fronthaul and midhaul networks`
  },
  {
    n:13, hot:true, cat:"networks",
    unit:"Mobile Networks",
    text:"What is CDMA? How does it differ from GSM?",
    papers:["Jun 2023","Dec 2025"],
    freq:4,
    answer:`**CDMA (Code Division Multiple Access)** is a channel access method where multiple transmitters simultaneously send signals over a single communication channel. Each user is assigned a unique spreading code (chip code) that allows all users to transmit on the same frequency simultaneously.

**How CDMA works:**
- Each bit of data is multiplied by a unique pseudo-random noise (PN) code
- Spreading code converts narrowband signal to wideband signal
- All users share same frequency spectrum
- Receiver uses the same code to extract intended signal from noise
- Unwanted signals appear as background noise (spread spectrum)

**CDMA vs GSM Comparison:**

| Feature | CDMA | GSM |
|---|---|---|
| Access Method | Spread spectrum | TDMA |
| Multiple Access | All on same frequency | Time slots |
| Frequency Reuse | Can reuse frequency in all cells | 7-cell cluster typically |
| SIM Card | No (ESN-based) | Yes (SIM card) |
| Call Quality | Better in high-load | Slightly lower under load |
| Security | More secure (PN code) | Encryption-based |
| Roaming | Limited international | Excellent worldwide |
| Standardization | Qualcomm/US centric | Global standard |
| Used by | Verizon, Sprint (US) | Most of world |
| Generation | 3G CDMA2000 | GSM, GPRS, EDGE |

**Advantages of CDMA:** Better capacity per cell, soft handover, no frequency planning needed, more secure, less interference. **Disadvantages:** Complex power control required, less global roaming.`
  },
  {
    n:14, hot:false, cat:"networks",
    unit:"Mobile Networks",
    text:"What is WiMAX? Explain its features and applications.",
    papers:["Jun 2023"],
    freq:2,
    answer:`**WiMAX (Worldwide Interoperability for Microwave Access)** is a wireless broadband standard based on IEEE 802.16. It provides metropolitan area network (MAN) wireless connectivity as a last-mile alternative to cable and DSL.

**Features of WiMAX:**
- **High bandwidth:** Up to 75 Mbps (802.16d), 1 Gbps theoretical
- **Long range:** Line-of-sight up to 50 km; non-line-of-sight up to 10 km
- **QoS support:** Four service classes for different traffic types
- **OFDM modulation:** Efficient spectrum use
- **Scalable bandwidth:** 1.5 MHz to 28 MHz channels
- **Two versions:** Fixed WiMAX (802.16d) and Mobile WiMAX (802.16e)
- **Security:** PKM-EAP authentication, AES encryption
- **Self-backhauling:** Can use WiMAX for backhaul

**Service Classes:**
1. UGS (Unsolicited Grant Service) — real-time, constant bit rate (VoIP)
2. rtPS (Real-time Polling) — variable rate real-time (video)
3. nrtPS (Non-real-time Polling) — non-real-time (FTP)
4. BE (Best Effort) — web browsing

**Applications:**
- Last-mile broadband in underserved areas
- Backhaul for cellular networks
- Public hotspot extensions
- Enterprise connectivity
- Emergency/disaster recovery communications
- Mobile broadband alternative to 3G/4G`
  },
  {
    n:15, hot:false, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"Explain WLAN / Wi-Fi IEEE 802.11x networks in detail.",
    papers:["Jun 2024"],
    freq:2,
    answer:`**WLAN (Wireless Local Area Network) / Wi-Fi** is based on the IEEE 802.11 family of standards, enabling wireless networking within a limited area (home, office, campus).

**IEEE 802.11 Standards Evolution:**

| Standard | Frequency | Max Speed | Range |
|---|---|---|---|
| 802.11b | 2.4 GHz | 11 Mbps | 35 m indoor |
| 802.11a | 5 GHz | 54 Mbps | 35 m indoor |
| 802.11g | 2.4 GHz | 54 Mbps | 38 m indoor |
| 802.11n | 2.4/5 GHz | 600 Mbps | 70 m indoor |
| 802.11ac (Wi-Fi 5) | 5 GHz | 3.5 Gbps | 35 m indoor |
| 802.11ax (Wi-Fi 6) | 2.4/5/6 GHz | 9.6 Gbps | 35 m indoor |

**WLAN Architecture:**
- **Infrastructure Mode:** Access Point (AP) acts as hub; all communication through AP
- **Ad-hoc/IBSS Mode:** Direct peer-to-peer, no AP needed
- **ESS (Extended Service Set):** Multiple APs connected to distribution system for larger coverage

**MAC Protocol:** CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) — listens before transmitting; uses RTS/CTS for collision avoidance.

**Security Standards:**
- WEP (weak, deprecated)
- WPA (Wi-Fi Protected Access)
- WPA2 (AES-CCMP, current standard)
- WPA3 (latest, strongest)

**Applications:** Home networking, office LANs, hotspots, IoT device connectivity, mobile device internet access.`
  },
  {
    n:16, hot:false, cat:"apps",
    unit:"Apps & Development",
    text:"Explain various phases of the development process of a mobile application.",
    papers:["Jun 2024"],
    freq:2,
    answer:`**Mobile Application Development Process** follows a structured lifecycle:

**Phase 1 — Research & Strategy:**
- Identify target audience and market need
- Competitor analysis
- Define app purpose, goals, and KPIs
- Choose platform (iOS, Android, cross-platform)
- Determine monetization model

**Phase 2 — Planning:**
- Define features and functionality
- Create product backlog / feature list
- Resource planning (team, budget, timeline)
- Technology stack selection
- Project roadmap

**Phase 3 — UI/UX Design:**
- Wireframing (low-fidelity sketches)
- Prototyping (interactive mockups — Figma, Adobe XD)
- User testing on prototypes
- Visual design (color, typography, icons)
- Design approval

**Phase 4 — Development:**
- Frontend development (UI implementation)
- Backend development (APIs, server, database)
- API integration (third-party services)
- Iterative sprints (Agile methodology)
- Code reviews

**Phase 5 — Testing:**
- Unit testing, integration testing
- Functional testing
- Performance and load testing
- Security testing
- User Acceptance Testing (UAT)
- Beta testing with real users

**Phase 6 — Deployment:**
- App Store / Play Store submission
- Review process compliance
- Production release
- Post-launch monitoring

**Phase 7 — Maintenance & Updates:**
- Bug fixes
- Feature enhancements based on feedback
- OS compatibility updates
- Performance optimization`
  },
  {
    n:17, hot:false, cat:"arch",
    unit:"Architecture",
    text:"What is Data Synchronization in mobile computing? Explain its methods.",
    papers:["Jun 2023","Jun 2025"],
    freq:3,
    answer:`**Data Synchronization** in mobile computing is the process of maintaining consistency of data between a mobile device and a server (or other devices) when the mobile device may have been offline or had intermittent connectivity.

**Need for Synchronization:**
- Mobile devices can work offline (disconnected operation)
- When reconnected, local changes must be reconciled with server data
- Multiple users may edit same data — conflicts must be resolved

**Synchronization Methods:**

**1. Full Synchronization (Bulk Sync):**
- Complete dataset transferred every sync
- Simple to implement
- Inefficient for large databases
- Suitable for small datasets

**2. Incremental Synchronization:**
- Only changes (deltas) since last sync transferred
- Efficient bandwidth use
- Requires change tracking (timestamps, version numbers)
- Most common approach

**3. One-way Synchronization:**
- Data flows in one direction only (server → client or client → server)
- Simpler, no conflict resolution needed
- Example: News feed refresh

**4. Two-way Synchronization:**
- Changes flow both directions
- Requires conflict detection and resolution
- Example: Calendar sync between phone and server

**Conflict Resolution Strategies:**
- **Last-write-wins:** Most recent change prevails
- **Server-wins:** Server data always authoritative
- **Client-wins:** Client data always authoritative
- **Manual resolution:** User chooses which version to keep

**Sync Protocols:** SyncML (OMA DS standard), ActiveSync, CalDAV/CardDAV (calendar/contacts), rsync.`
  },
  {
    n:18, hot:false, cat:"arch",
    unit:"Architecture",
    text:"Explain Mobile Device Data Store methods and architecture patterns.",
    papers:["Jun 2024","Jun 2025","Dec 2025"],
    freq:4,
    answer:`**Mobile Device Data Store Methods** refer to the various ways data is persisted locally on a mobile device.

**1. SQLite Database:**
- Lightweight relational database
- Available on all major mobile platforms
- Supports full SQL queries
- Best for structured, relational data
- Android: SQLiteOpenHelper / Room ORM; iOS: Core Data / FMDB

**2. SharedPreferences / NSUserDefaults:**
- Key-value pair storage
- Android: SharedPreferences; iOS: NSUserDefaults
- Best for small configuration/setting data
- Not suitable for large or complex data

**3. File System Storage:**
- Read/write files to device storage
- Internal storage (private) vs External storage (SD card)
- Best for binary files, media, documents
- Requires permission management

**4. Content Providers (Android):**
- Shares structured data between applications
- Standard interface for accessing data
- Examples: Contacts, Calendar, Media Store

**5. NoSQL/Object Storage:**
- Realm Database: Object-oriented mobile database
- Couchbase Lite: Document-based, sync-ready
- Best for document or graph-structured data

**6. Cloud/Remote Storage:**
- Firebase Realtime Database, Firestore
- AWS Amplify, Azure Mobile Apps
- Data synced between device and cloud

**Architecture Patterns for Data Store:**
- **Repository Pattern:** Abstract data source from business logic
- **MVVM (Model-View-ViewModel):** Separates UI from data layer
- **DAO (Data Access Object):** Interface for database operations
- **Caching Strategy:** Store frequently accessed data locally to reduce network calls`
  },
  {
    n:19, hot:false, cat:"apps",
    unit:"Apps & Development",
    text:"Write a short note on Mobile Commerce (M-Commerce).",
    papers:["Jun 2023"],
    freq:2,
    answer:`**M-Commerce (Mobile Commerce)** refers to buying and selling of goods and services through wireless handheld devices such as smartphones and tablets. It is an extension of e-commerce conducted over wireless networks.

**Key Features:**
- Ubiquity — accessible anywhere, anytime
- Personalization — tailored to individual users
- Location-awareness — location-based offers and services
- Convenience — purchase without a desktop computer
- Immediacy — real-time transactions

**Types of M-Commerce:**
1. **Mobile Shopping:** Purchasing products via apps or mobile websites (Amazon, Flipkart)
2. **Mobile Banking:** Checking balances, fund transfer, bill payment (banking apps)
3. **Mobile Payments:** Contactless payments using NFC (Google Pay, Apple Pay, PhonePe)
4. **Mobile Ticketing:** Airlines, cinema, events booking on phone
5. **Mobile Brokerage:** Stock trading on smartphones
6. **Mobile Advertising:** Location-targeted ads delivered to mobile users
7. **Mobile Auctions:** Bidding via smartphones

**Advantages:**
- Convenience and accessibility 24/7
- Location-based personalized services
- Faster transaction processing
- Wider market reach

**Challenges:**
- Screen size limitations for browsing
- Security concerns (payment fraud)
- Network connectivity issues
- Device fragmentation
- Privacy concerns

**Technologies enabling M-Commerce:** 4G/5G, NFC, QR codes, mobile wallets, SSL/TLS security.`
  },
  {
    n:20, hot:false, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"What is guided transmission? How does it differ from unguided transmission? Give examples.",
    papers:["Jun 2023"],
    freq:2,
    answer:`**Guided Transmission (Wired/Bounded Media):** Signal is directed along a physical path using a conductor. The medium confines and guides the signal.

**Examples of Guided Media:**
1. **Twisted Pair Cable:** Two insulated copper wires twisted together. UTP (Unshielded) used in Ethernet; STP (Shielded) for less interference. Speed: up to 10 Gbps. Used in LANs, telephone lines.
2. **Coaxial Cable:** Inner conductor surrounded by insulation and outer conductor. Suitable for long-distance, less interference. Used in cable TV, older Ethernet.
3. **Fiber Optic Cable:** Light pulses through glass/plastic core. Very high bandwidth (terabits), immune to EMI, long distances. Used in backbone networks, internet infrastructure.

**Unguided Transmission (Wireless/Unbounded Media):** Signal propagates through air (or vacuum) without a physical conductor.

**Examples of Unguided Media:**
1. **Radio waves:** Omnidirectional, penetrate walls. AM/FM radio, Wi-Fi, Bluetooth, cellular networks.
2. **Microwaves:** Directional, line-of-sight. Satellite communication, 5G, microwave links.
3. **Infrared:** Short-range, line-of-sight. TV remotes, old IrDA data transfer.

**Comparison:**

| Feature | Guided | Unguided |
|---|---|---|
| Medium | Physical cable | Air/free space |
| Security | More secure | Vulnerable to eavesdropping |
| Mobility | Fixed | Mobile |
| Installation | Complex wiring | Easy to deploy |
| Range | Limited by cable length | Can cover large areas |
| Interference | Less susceptible | More susceptible to EMI |
| Cost | Higher installation | Lower deployment cost |`
  },
  {
    n:21, hot:false, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"What is an antenna? Explain its functionality and the factors on which its size depends.",
    papers:["Jun 2023","Dec 2025"],
    freq:3,
    answer:`**Antenna** is a transducer that converts electrical signals into electromagnetic waves (for transmission) and electromagnetic waves back into electrical signals (for reception). It is the interface between guided and unguided transmission.

**Functionality of an Antenna:**
- **Transmission:** Converts alternating current (AC) from transmitter into electromagnetic radiation
- **Reception:** Captures electromagnetic waves and converts to electrical current
- **Directivity:** Focuses energy in specific directions (directional antennas) or radiates equally in all directions (omnidirectional)
- **Gain:** Measure of antenna's ability to concentrate energy in a particular direction
- **Impedance matching:** Antenna matches transmitter/receiver impedance to free space (377 ohms)

**Types of Antennas:**
- **Omnidirectional:** Radiates equally in horizontal plane (dipole, monopole) — used in mobile phones, Wi-Fi APs
- **Directional/Yagi:** Focuses energy in one direction — used in TV reception, point-to-point links
- **Parabolic dish:** Highly directional — satellite communication
- **Array antennas:** Multiple elements — MIMO, beamforming in 5G

**Factors determining Antenna Size:**

1. **Wavelength (λ):** Antenna size is directly proportional to wavelength. λ = c/f (c = speed of light, f = frequency). A half-wave dipole = λ/2 in length.

2. **Frequency:** Higher frequency → shorter wavelength → smaller antenna. GSM 900 MHz antenna is physically larger than a 2.4 GHz Wi-Fi antenna.

3. **Gain requirement:** Higher gain requires larger antenna or antenna arrays.

4. **Application:** Base station antennas are larger than handheld device antennas due to no size constraints.`
  },
  {
    n:22, hot:false, cat:"networks",
    unit:"Mobile Networks",
    text:"Explain the features of a 4G network and how it differs from 3G.",
    papers:["Jun 2023","Dec 2025"],
    freq:3,
    answer:`**4G (Fourth Generation)** mobile network standard, defined by ITU as IMT-Advanced. Main implementations: LTE (Long-Term Evolution) and WiMAX.

**Features of 4G:**
- **High data rates:** 100 Mbps for mobile users, 1 Gbps for stationary (LTE-Advanced)
- **Low latency:** ~10 ms (vs 100+ ms for 3G)
- **All-IP network:** Voice and data over IP (VoLTE — Voice over LTE)
- **OFDMA downlink, SC-FDMA uplink**
- **MIMO antennas:** Multiple antennas for increased throughput
- **Wider channels:** Up to 20 MHz (vs 5 MHz for 3G)
- **QoS support:** Prioritizes different types of traffic
- **Enhanced security:** 128-bit AES encryption
- **Improved spectral efficiency:** 3× better than 3G
- **Self-Organizing Networks (SON):** Automatic optimization

**4G vs 3G:**

| Feature | 3G (UMTS/HSPA) | 4G (LTE) |
|---|---|---|
| Peak Download | 14 Mbps | 100–1000 Mbps |
| Latency | 100–500 ms | 10–50 ms |
| Architecture | Circuit + Packet | All-IP |
| Voice | Circuit-switched | VoLTE (packet) |
| Multiple Access | WCDMA | OFDMA |
| Frequency | 2.1 GHz | 700 MHz–2.6 GHz |

**Applications enabled by 4G:** HD video streaming, mobile gaming, IoT connectivity, real-time video conferencing, cloud-based apps.`
  },
  {
    n:23, hot:false, cat:"networks",
    unit:"Mobile Networks",
    text:"Explain soft handover and hard handover in mobile networks.",
    papers:["Dec 2024"],
    freq:2,
    answer:`**Handover (Handoff)** is the process of transferring an ongoing call or data session from one cell (base station) to another as a mobile user moves between cells. Without handover, calls would drop as signal weakens.

**Hard Handover (Break-Before-Make):**
- Connection to current base station is broken BEFORE new connection established
- Used in GSM (TDMA) networks
- Momentary interruption during handover
- Only one base station serves the mobile at a time
- Less complex, less resource-intensive
- Types:
  - **Intra-cell:** Between sectors of same cell
  - **Inter-cell:** Between different cells of same BSC
  - **Inter-BSC:** Between cells of different BSCs
  - **Inter-MSC:** Between cells of different MSCs

**Soft Handover (Make-Before-Break):**
- New connection established BEFORE old connection is released
- Used in CDMA networks (same frequency for all cells)
- Mobile communicates with multiple base stations simultaneously
- BSC/RNC combines signals from multiple sources (macro diversity)
- No interruption during handover
- Better voice/data quality during transition
- Uses more network resources (multiple channels active)

**Softer Handover (CDMA):**
- Handover between sectors of the SAME base station
- Even simpler than soft handover — handled at sector level

**Handover Decision Factors:**
- Received signal strength (RSSI)
- Signal-to-interference ratio (SIR)
- Cell load balancing
- User velocity`
  },
  {
    n:24, hot:false, cat:"emerging",
    unit:"Emerging Technologies",
    text:"Explain the features of a 5G network and its advantages.",
    papers:["Dec 2024"],
    freq:2,
    answer:`**5G (Fifth Generation)** mobile network — the successor to 4G LTE, standardized by 3GPP Release 15+. Designed not just for mobile broadband but also for massive IoT and ultra-reliable low-latency communications.

**Features of 5G:**
- **Extreme data rates:** Peak 20 Gbps download, 10 Gbps upload
- **Ultra-low latency:** 1 ms (vs 10 ms for 4G) — enables real-time control
- **Massive connectivity:** 1 million devices per km² (vs 100K for 4G)
- **Network slicing:** Virtual networks tailored for specific use cases
- **Millimeter wave (mmWave):** High frequency (24–100 GHz) for dense urban capacity
- **Sub-6 GHz bands:** For wide coverage
- **Massive MIMO:** Hundreds of antennas at base station
- **Beamforming:** Focuses signal toward specific users
- **Edge computing integration:** Processing close to the user
- **Dynamic Spectrum Sharing (DSS):** Share spectrum with 4G

**5G Use Cases (IMT-2020 requirements):**
1. **eMBB (Enhanced Mobile Broadband):** HD/4K/8K streaming, AR/VR, fixed wireless access
2. **mMTC (Massive Machine-Type Communications):** Smart cities, agriculture sensors, industrial IoT
3. **URLLC (Ultra-Reliable Low-Latency):** Autonomous vehicles, remote surgery, industrial automation

**Advantages:** Enables autonomous vehicles, Industry 4.0, smart cities, remote healthcare, immersive AR/VR experiences.

**Challenges:** High infrastructure cost, mmWave limited range, health concerns debate, security in 5G network slicing.`
  },
  {
    n:25, hot:false, cat:"emerging",
    unit:"Emerging Technologies",
    text:"Explain Mobile Cloud Computing and its advantages for users.",
    papers:["Dec 2024"],
    freq:2,
    answer:`**Mobile Cloud Computing (MCC)** is a model that combines mobile computing, cloud computing, and wireless networks to provide rich computational resources to mobile users, network operators, and cloud computing providers.

**Architecture of MCC:**
- **Mobile Device:** Thin client — handles UI, input, minimal processing
- **Wireless Network:** Connects device to internet (3G/4G/5G/Wi-Fi)
- **Internet:** Routes requests to cloud
- **Cloud Infrastructure:** Servers, storage, processing (IaaS/PaaS/SaaS)
- **Mobile Backend Services:** API gateways, authentication, push notifications

**Cloudlet / Mobile Edge Computing:**
- Small-scale cloud datacenter close to the user
- Reduces latency vs distant cloud
- Offloads computation from device to nearby server

**Advantages for Users:**
1. **Extended battery life:** Heavy computation offloaded to cloud, saving device battery
2. **Extended storage:** Cloud provides unlimited storage (Google Drive, iCloud, Dropbox)
3. **Improved reliability:** Data backed up; app continues from any device
4. **Access to powerful processing:** Machine learning, image recognition run on cloud
5. **Lower device cost:** No need for expensive hardware; cheap thin clients
6. **Data sharing and collaboration:** Real-time collaborative editing (Google Docs)
7. **On-demand scaling:** Resources scale automatically with demand
8. **Cross-device access:** Same data accessible from phone, tablet, desktop

**Challenges:** Latency for real-time apps, data privacy, bandwidth costs, offline functionality.`
  },
  {
    n:26, hot:false, cat:"apps",
    unit:"Apps & Development",
    text:"What is XML? Explain XML parsing with an example.",
    papers:["Jun 2024","Dec 2025"],
    freq:3,
    answer:`**XML (eXtensible Markup Language)** is a markup language that defines rules for encoding documents in a format that is both human-readable and machine-readable. Unlike HTML, XML tags are custom-defined and describe the data they contain.

**Features of XML:**
- Platform-independent and language-independent
- Self-descriptive (tags describe content meaning)
- Supports Unicode (international text)
- Hierarchical, tree-structured data
- Supports attributes and namespaces
- Validated by DTD or XML Schema (XSD)

**XML Example:**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<students>
  <student id="101">
    <name>Rahul Kumar</name>
    <course>MCA</course>
    <semester>4</semester>
  </student>
  <student id="102">
    <name>Priya Singh</name>
    <course>MCA</course>
    <semester>2</semester>
  </student>
</students>
\`\`\`

**XML Parsing in Mobile (Android):**

**1. DOM Parser (Document Object Model):**
- Loads entire XML into memory as tree
- Easy navigation but high memory usage
- Best for small documents

**2. SAX Parser (Simple API for XML):**
- Event-driven, sequential parsing
- Low memory footprint — doesn't load entire document
- Best for large documents on mobile
- Events: startElement, endElement, characters

**3. XMLPullParser (Android recommended):**
- Pull-based parsing — developer controls when to get next event
- Efficient for mobile, low memory
- Used by Android system internally

**Use in Mobile:** XML used for web service responses (SOAP), configuration files, layouts (Android XML layouts), and data exchange between apps and servers.`
  },
  {
    n:27, hot:false, cat:"apps",
    unit:"Apps & Development",
    text:"Write a short note on the Swift programming language for iOS development.",
    papers:["Jun 2024"],
    freq:2,
    answer:`**Swift** is a powerful, intuitive, open-source programming language developed by Apple in 2014. It was designed to replace Objective-C for iOS, macOS, watchOS, and tvOS development.

**Key Features of Swift:**
- **Type Safety & Type Inference:** Compiler enforces type correctness; types often inferred automatically
- **Optionals:** Safe handling of nil values (no null pointer crashes)
- **Closures:** Expressive first-class functions
- **Generics:** Reusable, flexible code
- **Protocols & Protocol-Oriented Programming:** Swift's core design paradigm
- **Memory Management:** ARC (Automatic Reference Counting) — no manual memory management
- **Error Handling:** try/catch/throw mechanism
- **Playgrounds:** Interactive coding environment for experimentation
- **Open source:** Available on Linux as well

**Swift vs Objective-C:**
- Cleaner, modern syntax (no header files, no semicolons required)
- Faster execution (2× faster than Objective-C per Apple benchmarks)
- Safer (optionals prevent many common crashes)
- Interoperable with existing Objective-C code
- Actively developed with new features

**Swift for Mobile Development:**
- **UIKit:** Traditional imperative UI framework (iOS 2–present)
- **SwiftUI:** Modern declarative UI framework (iOS 13+)
- **Xcode:** Official IDE for Swift development
- **Swift Package Manager:** Dependency management

**Example:**
\`\`\`swift
var greeting: String = "Hello, IGNOU"
let pi: Double = 3.14159
func add(_ a: Int, _ b: Int) -> Int { return a + b }
\`\`\``
  },
  {
    n:28, hot:false, cat:"apps",
    unit:"Apps & Development",
    text:"Explain the architecture of a content management application for mobile.",
    papers:["Jun 2024"],
    freq:2,
    answer:`**Content Management Application (CMA)** architecture for mobile follows a layered design that separates content creation, management, storage, and delivery.

**Architecture Layers:**

**1. Presentation Layer (Mobile Client):**
- Native or hybrid mobile app (iOS/Android)
- Content consumption UI: lists, article views, media players
- Content creation UI: text editors, image upload, forms
- Caching for offline reading

**2. Application Layer (Business Logic):**
- Content Delivery API (REST/GraphQL)
- Authentication & Authorization (OAuth 2.0, JWT)
- Content processing: search, filtering, pagination
- Workflow management (draft → review → publish)
- Push notification service

**3. Content Repository Layer:**
- **CMS Core:** Content models (articles, images, videos, metadata)
- **Version control:** Track changes, rollback content
- **DAM (Digital Asset Management):** Store and manage media files
- **CDN Integration:** Global content delivery for images/videos

**4. Data Storage Layer:**
- **Relational DB:** Content metadata (MySQL, PostgreSQL)
- **Object Storage:** Media files (S3, Google Cloud Storage)
- **Search Index:** Full-text search (Elasticsearch)
- **Cache:** Redis for frequently accessed content

**Key Concepts:**
- **Headless CMS:** Backend-only; delivers content via API to any frontend (mobile, web, IoT)
- **Responsive Content:** Adapts to screen size (thumbnails vs full images)
- **Offline Support:** Cache articles for offline reading
- **Example CMSes:** Contentful, Sanity, Strapi for mobile-first content delivery`
  },
  {
    n:29, hot:false, cat:"arch",
    unit:"Architecture",
    text:"What is Mobile IP? Explain its objective and working with a diagram.",
    papers:["Dec 2024"],
    freq:2,
    answer:`**Mobile IP** is an Internet Engineering Task Force (IETF) standard protocol (RFC 3344 for IPv4, RFC 6275 for IPv6) that allows a mobile node to maintain its IP address while moving from one network to another. Without Mobile IP, moving networks changes your IP, breaking connections.

**Objective of Mobile IP:**
- Enable uninterrupted communication as mobile nodes move between networks
- Allow a node to use two IP addresses: a permanent home address and a temporary care-of address
- Transparent to higher-layer protocols (TCP sessions survive movement)
- Maintain reachability with existing correspondents without changing IP

**Key Entities:**

1. **Mobile Node (MN):** Device that moves between networks (smartphone, laptop)
2. **Home Agent (HA):** Router on the home network that maintains location of MN; intercepts packets for MN when it is away
3. **Foreign Agent (FA):** Router on visited network that provides routing services to MN
4. **Correspondent Node (CN):** Host communicating with MN
5. **Home Address:** Permanent IP address of MN
6. **Care-of Address (CoA):** Temporary IP address at foreign network

**Working of Mobile IP:**

1. MN arrives in foreign network; gets Care-of Address from FA
2. MN registers its CoA with HA (Registration Request/Reply)
3. CN sends packet to MN's Home Address
4. HA intercepts the packet; **tunnels** it to CoA (IP-in-IP encapsulation)
5. FA receives tunneled packet; strips outer header; delivers to MN
6. MN replies directly to CN (triangle routing) or via HA
7. When MN returns home, deregisters with HA

**Route Optimization:** Allows CN to send directly to CoA, bypassing HA for efficiency.`
  },
  {
    n:30, hot:false, cat:"os",
    unit:"Mobile OS & Platforms",
    text:"Explain the functions of a mobile operating system.",
    papers:["Dec 2022","Dec 2025"],
    freq:3,
    answer:`**Mobile Operating System (Mobile OS)** is software that manages hardware resources of a mobile device and provides services to applications. Examples: Android, iOS, Windows Phone, Symbian.

**Functions of a Mobile OS:**

**1. Process Management:**
- Manages running applications and background services
- Multitasking: switches between foreground and background apps
- Process scheduling and prioritization
- Kills background processes to free memory (important for mobile)

**2. Memory Management:**
- Manages limited RAM efficiently
- Virtual memory management
- Garbage collection (Android/Java)
- ARC (iOS/Swift) — automatic memory management

**3. File System Management:**
- Manages internal and external storage
- Provides file access APIs to apps
- Manages sandboxing (each app's private storage)
- Handles SD card mounting/unmounting

**4. Device Driver Management:**
- Interfaces with hardware: camera, GPS, accelerometer, gyroscope, NFC, Bluetooth
- Provides hardware abstraction layer
- Manages peripheral connections (USB, Bluetooth accessories)

**5. Security Management:**
- User authentication (PIN, fingerprint, face recognition)
- App sandboxing (isolates apps from each other)
- Permission system (camera, location, contacts access)
- Encryption of device data
- Secure boot

**6. Network Management:**
- Manages Wi-Fi, cellular, Bluetooth, NFC connections
- Network selection and switching
- Mobile IP / VPN support

**7. Power Management:**
- Battery level monitoring
- CPU frequency scaling (performance modes)
- App background activity restrictions
- Doze mode / battery optimization

**8. UI Management:**
- Touch input handling (gestures, multi-touch)
- Screen rendering and display management
- Notification system
- Accessibility services`
  },
  {
    n:31, hot:false, cat:"arch",
    unit:"Architecture",
    text:"Explain thick client and thin client architectures in mobile computing.",
    papers:["Dec 2024","Jun 2025"],
    freq:3,
    answer:`**Client Architecture** in mobile computing refers to how processing is divided between the mobile device (client) and the server.

---

**Thick Client (Fat Client) Architecture:**

A thick client performs significant processing locally on the mobile device.

**Characteristics:**
- Most business logic runs on the device
- Large local data storage (local database)
- Works offline without server connection
- Rich, responsive UI (native performance)
- Periodic sync with server

**Advantages:**
- Fast UI response (no network dependency for interactions)
- Works offline
- Lower server load
- Better user experience

**Disadvantages:**
- Higher device hardware requirements
- Larger app size
- Updates require new app version download
- Security risk — logic/data on device

**Examples:** Native mobile banking apps, games, photo editors, email apps (offline mode)

---

**Thin Client Architecture:**

A thin client relies heavily on the server for processing; device mainly handles display.

**Characteristics:**
- Business logic runs on server
- Minimal local storage
- Requires constant server connection
- UI typically web-based or simple native wrapper
- Server sends rendered content or data

**Advantages:**
- Low hardware requirements on device
- Easier to update (server-side changes)
- Better data security (data stays on server)
- Lower device storage needs

**Disadvantages:**
- Requires reliable network connection
- Higher server load and cost
- Latency affects responsiveness
- Poor offline experience

**Examples:** Web browsers accessing web apps, terminal emulators, streaming services (Netflix), web-based enterprise apps

---

**Smart Client** is a middle ground — has a rich UI and some local processing, but depends on servers for backend services. Modern apps (WhatsApp, Uber) are typically smart clients.`
  },
  {
    n:32, hot:false, cat:"arch",
    unit:"Architecture",
    text:"Explain data replication methods in mobile computing.",
    papers:["Dec 2024"],
    freq:2,
    answer:`**Data Replication** in mobile computing refers to the process of storing copies of data on multiple devices or servers to improve availability, reliability, and performance for mobile users.

**Need for Replication in Mobile Computing:**
- Mobile users face intermittent connectivity
- Disconnected operations require local data
- Reduce latency by serving data from nearest copy
- Fault tolerance — if server fails, replicas serve data

**Types of Replication:**

**1. Full Replication:**
- Complete copy of the database on each node/device
- Highest availability and fastest local access
- High storage cost; synchronization complexity increases with size
- Suitable for small, read-heavy datasets

**2. Partial Replication:**
- Only a subset of data replicated to each node
- More efficient storage
- User gets only relevant data (e.g., only their records)
- Requires smarter replication policy

**3. Fragment Replication:**
- Database divided into fragments (horizontal or vertical)
- Different fragments replicated to different nodes
- Balances load and storage

**Replication Modes:**

**Synchronous Replication:**
- Changes committed to all replicas before confirming to user
- Guarantees consistency (no stale reads)
- Higher latency (waits for all replicas)
- Not ideal for mobile (intermittent connectivity)

**Asynchronous Replication:**
- Changes committed locally first; replicas updated later
- Low latency, works offline
- Temporary inconsistency (eventual consistency)
- Preferred for mobile environments

**Conflict Resolution:** When same data modified on multiple replicas simultaneously:
- Timestamp-based (most recent wins)
- Application-specific merge logic
- Manual resolution by user

**Technologies:** CouchDB (with Couchbase Lite for mobile), Firebase Realtime Database, Realm Sync.`
  },
  {
    n:33, hot:false, cat:"arch",
    unit:"Architecture",
    text:"List and explain any five applications of mobile computing.",
    papers:["Dec 2022"],
    freq:2,
    answer:`Mobile computing has transformed industries by enabling computing and communication anywhere. Here are five key application domains:

**1. Mobile Healthcare (mHealth):**
- Remote patient monitoring via wearable sensors
- Telemedicine — video consultations with doctors
- Electronic health records (EHR) access by doctors
- Medication reminder apps
- Fitness tracking (heart rate, steps, sleep)
- Examples: Apple Health, MyFitnessPal, eSanjeevani

**2. Mobile Commerce (M-Commerce):**
- Online shopping via mobile apps (Amazon, Flipkart)
- Mobile payments (Google Pay, PhonePe, Apple Pay)
- Mobile banking — balance check, NEFT, IMPS
- Mobile ticketing — flights, trains, movies
- Examples: Paytm, BHIM, bank apps

**3. Mobile Entertainment:**
- Video streaming (Netflix, YouTube, Hotstar)
- Online gaming (PUBG, Free Fire, chess)
- Music streaming (Spotify, JioSaavn)
- Podcasts, ebooks, digital magazines
- Social media (Instagram, Snapchat)

**4. Mobile Navigation & Location Services:**
- Turn-by-turn navigation (Google Maps, Apple Maps)
- Ride-hailing services (Uber, Ola)
- Food delivery with real-time tracking (Swiggy, Zomato)
- Location-based advertising
- Asset tracking (fleet management, package delivery)

**5. Mobile Learning (mLearning):**
- Online courses and video lectures (SWAYAM, Coursera)
- IGNOU mobile study apps
- Language learning (Duolingo)
- Virtual classrooms during COVID-19
- Digital textbooks and reference materials

**Other important applications:** Mobile CRM, field force automation, emergency services dispatch, precision agriculture (soil sensors), smart cities (traffic management).`
  },
  {
    n:34, hot:false, cat:"emerging",
    unit:"Emerging Technologies",
    text:"What are Actuators? Give examples of actuators found in IoT/Robots.",
    papers:["Jun 2024","Dec 2025"],
    freq:3,
    answer:`**Actuators** are devices that convert an electrical signal (or other energy input) into a physical action or motion. In the context of IoT and robotics, actuators are the "output" devices that cause changes in the physical world based on commands from a controller/microprocessor.

**Contrast with Sensors:** Sensors sense the environment (input devices); actuators act on the environment (output devices).

**Types of Actuators:**

**1. Electric Actuators:**
- **DC Motor:** Converts electrical energy to rotational motion. Used in wheels, conveyors.
- **Servo Motor:** Controlled rotation to specific angle. Used in robot arms, RC cars.
- **Stepper Motor:** Precise incremental rotation. Used in 3D printers, CNC machines.
- **Linear Actuator:** Converts rotation to linear motion. Used in adjustable desks, valves.

**2. Hydraulic Actuators:**
- Uses pressurized fluid (oil) for powerful movement
- Used in heavy machinery, excavators, industrial presses

**3. Pneumatic Actuators:**
- Uses compressed air
- Used in factory automation, robotic grippers, valves

**4. Solenoid Actuators:**
- Electromagnetic coil pulls/pushes a metal plunger
- Used in door locks, fuel injectors, pinball machines

**5. Piezoelectric Actuators:**
- Converts electrical signal to mechanical deformation
- Used in precision instruments, inkjet printer heads, vibration control

**Examples in Robots:**
- **Arm joints:** Servo motors for controlled movement
- **Gripper:** Electric/pneumatic actuator to grasp objects
- **Wheels/locomotion:** DC motors
- **Speaker:** Electromagnetic actuator (voice coil)
- **Vibration motor:** In smartphones (haptic feedback)
- **LED/Display:** Considered output actuators in simple systems`
  },
  {
    n:35, hot:false, cat:"arch",
    unit:"Architecture",
    text:"Compare and contrast TCP and UDP protocols in the context of mobile computing.",
    papers:["Dec 2024"],
    freq:2,
    answer:`**TCP (Transmission Control Protocol)** and **UDP (User Datagram Protocol)** are transport layer protocols. Their behavior has important implications for mobile computing.

**TCP (Connection-oriented, Reliable):**
- Establishes connection via 3-way handshake (SYN, SYN-ACK, ACK)
- Guarantees delivery, ordering, and error correction
- Flow control (prevents sender from overwhelming receiver)
- Congestion control (adjusts to network conditions)
- Acknowledgment for every segment
- Example: HTTP/HTTPS, email, file transfer

**UDP (Connectionless, Unreliable):**
- No connection setup; just send data
- No delivery guarantees, no ordering
- No flow control or congestion control
- Minimal overhead — very fast
- Application handles reliability if needed
- Example: DNS, VoIP, video streaming, online gaming

**Comparison Table:**

| Feature | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | No guarantee |
| Ordering | In-order delivery | No order guarantee |
| Speed | Slower (overhead) | Faster (less overhead) |
| Header size | 20 bytes | 8 bytes |
| Error checking | Checksum + retransmit | Checksum only |
| Congestion control | Yes | No |
| Use case | Web, email, file transfer | VoIP, streaming, DNS |

**Mobile Computing Context:**
- **TCP problems on mobile:** Wireless packet loss is misinterpreted as congestion → TCP reduces transmission rate unnecessarily → poor performance
- **Mobile TCP (M-TCP):** Modified version that differentiates wireless loss from congestion loss
- **UDP preferred for:** VoIP apps (WhatsApp calls), real-time video (Zoom), gaming — where speed matters more than reliability
- **TCP preferred for:** Downloading apps, browsing, email — where correctness is critical`
  },
  {
    n:36, hot:false, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"Explain signal weakening (attenuation, noise, interference) after wireless transmission.",
    papers:["Jun 2023"],
    freq:2,
    answer:`When a signal is transmitted wirelessly, its strength and quality degrade over distance and through obstacles. The main reasons are:

**1. Attenuation (Path Loss):**
- Gradual weakening of signal strength as it travels through a medium
- In free space: signal power decreases with square of distance (Inverse Square Law)
- In air: atmosphere absorbs some energy (especially at high frequencies)
- Physical obstacles: walls, buildings, hills absorb/reflect radio waves
- Solution: Amplifiers, repeaters, higher transmission power

**2. Absorption:**
- Materials absorb electromagnetic energy
- Water, concrete, glass all absorb to different degrees
- Human body absorbs 2.4 GHz signals (problem for Wi-Fi)
- Foliage significantly absorbs high-frequency signals

**3. Reflection:**
- Signal bounces off hard surfaces (buildings, walls, ground)
- Reflected signal adds to or subtracts from direct signal
- Multipath propagation: multiple copies of signal arrive at different times

**4. Diffraction:**
- Signal bends around edges of obstacles
- Allows communication around corners (though with weaker signal)
- Important for coverage behind buildings

**5. Scattering:**
- Signal dispersed in many directions when hitting rough surfaces or small objects
- Reduces signal strength in original direction
- Caused by rough terrain, foliage, street signs

**6. Interference:**
- **Co-channel interference:** Same frequency used by nearby cells
- **Adjacent channel interference:** Signals from neighboring frequency bands bleed over
- **Intermodulation distortion:** Non-linear combinations of multiple signals
- **Atmospheric noise:** Lightning, cosmic background radiation
- **Man-made interference:** Industrial equipment, microwave ovens at 2.4 GHz

**Mitigation Techniques:** Frequency planning, directional antennas, spread spectrum (CDMA/FHSS), MIMO (exploits multipath), power control.`
  },
  {
    n:37, hot:false, cat:"apps",
    unit:"Apps & Development",
    text:"Explain the features of an integrated development platform for mobile applications.",
    papers:["Dec 2022","Dec 2025"],
    freq:3,
    answer:`An **Integrated Development Platform (IDP)** for mobile apps is a comprehensive software environment that provides all tools needed to build, test, debug, and deploy mobile applications.

**Key Features of a Mobile IDP:**

**1. Code Editor:**
- Syntax highlighting and auto-completion (IntelliSense)
- Refactoring support
- Multiple language support (Java, Kotlin, Swift, JavaScript)
- Version control integration (Git)

**2. Compiler and Build System:**
- Compiles source code to executable bytecode/machine code
- Build automation (Gradle for Android, Xcode Build for iOS)
- Multi-variant builds (debug, release, flavors)

**3. Debugger:**
- Step-through debugging (breakpoints, step over, step in)
- Variable inspection at runtime
- Memory and CPU profiling
- Crash reporting and stack trace analysis
- Network traffic inspection

**4. Emulator / Simulator:**
- Test apps without physical devices
- Simulate different screen sizes and API levels
- Simulate GPS, sensors, network conditions
- Android Emulator, iOS Simulator

**5. UI Design Tools:**
- Drag-and-drop layout editors
- Preview on multiple screen sizes
- Constraint layout tools
- Android: Layout Editor; iOS: Interface Builder / SwiftUI Preview

**6. Testing Framework:**
- Unit testing (JUnit, XCTest)
- UI testing automation (Espresso, XCUITest)
- Integration test runners
- Code coverage reports

**7. Deployment Tools:**
- Code signing for app store submission
- APK/IPA generation
- Google Play and App Store submission tools

**Examples:** Android Studio (for Android), Xcode (for iOS), Visual Studio Code with React Native, Flutter SDK, Xamarin (cross-platform).`
  },
  {
    n:38, hot:false, cat:"os",
    unit:"Mobile OS & Platforms",
    text:"What are the features of iOS? Explain the iOS ecosystem.",
    papers:["Dec 2022","Dec 2025"],
    freq:3,
    answer:`**iOS** is Apple's mobile operating system for iPhone, iPad (iPadOS), and iPod Touch. First released in 2007 with the original iPhone.

**Features of iOS:**

**1. Security:**
- Secure Enclave: Dedicated security chip for Face ID, Touch ID, and encryption
- App Sandbox: Each app isolated from others
- App Store review process: Strict app vetting
- AES 256-bit hardware encryption
- Regular security updates

**2. User Interface:**
- Multi-touch gestures (swipe, pinch, tap, rotate)
- Haptic feedback (Taptic Engine)
- Dynamic Island (iPhone 14+)
- Control Center, Notification Center
- Dark mode support
- Accessibility features (VoiceOver, AssistiveTouch)

**3. Performance:**
- Apple Silicon chips (A-series, M-series) — optimized hardware-software integration
- Metal graphics API for high-performance gaming
- Background App Refresh — controlled background processing
- ARC (Automatic Reference Counting) — efficient memory management

**4. Connectivity:**
- Support for 5G, Wi-Fi 6E, Bluetooth 5.3, NFC, Ultra Wideband
- AirDrop — nearby device sharing
- Handoff and Continuity — seamless iPhone-Mac-iPad integration
- Personal Hotspot

**5. Multimedia:**
- Photos/Videos with ProRAW, ProRes
- FaceTime (Group video calling)
- Apple Music, Podcasts, Books
- AirPlay for streaming to TV/speakers

**iOS Ecosystem:**
- **App Store:** 2M+ apps, curated and reviewed
- **iCloud:** Seamless data sync across Apple devices
- **Apple Pay:** Mobile payments integration
- **Siri:** Voice assistant integrated system-wide
- **HomeKit, CarPlay, HealthKit:** Platform extensions
- **Swift/Objective-C:** Development languages
- **Xcode:** Official IDE`
  },
  {
    n:39, hot:false, cat:"arch",
    unit:"Architecture",
    text:"What is mobility in mobile computing? Explain different features of mobile computing.",
    papers:["Dec 2024"],
    freq:2,
    answer:`**Mobility in Mobile Computing** refers to the ability of users to access computing and communication resources while physically moving from one location to another, without disruption to service.

**Types of Mobility:**
- **User mobility:** User can use any terminal (same phone number, files accessible from any device)
- **Device mobility:** Device can move between networks (IP address may change; session continues via Mobile IP)
- **Service mobility:** Services follow the user regardless of network or device
- **Session mobility:** Active sessions (calls, downloads) continue while moving

**Features of Mobile Computing:**

**1. Portability:**
- Computing anywhere — not bound to a desk
- Lightweight devices with battery power
- Compact form factor

**2. Connectivity:**
- Always-connected via cellular (2G–5G), Wi-Fi, Bluetooth, NFC
- Seamless network switching
- Roaming between networks/countries

**3. Social Interactivity:**
- Real-time communication (calls, messaging, social media)
- Collaborative apps (Google Docs, shared calendars)

**4. Individuality:**
- Personalization of device and services
- Location-based personalized content
- User profiles and preferences

**5. Context Awareness:**
- Device knows location (GPS), orientation (accelerometer), environment (camera, microphone)
- Apps adapt to context (silent mode in meetings, navigation when driving)

**6. Scalability:**
- From simple SMS to complex cloud applications
- Millions of devices handled by cellular infrastructure

**Design Challenges:** Limited battery, limited bandwidth, intermittent connectivity, small screen, security on untrusted networks, device heterogeneity.`
  },
  {
    n:40, hot:false, cat:"wireless",
    unit:"Wireless & Transmission",
    text:"Explain WAP (Wireless Application Protocol) and its protocol stack.",
    papers:["Jun 2025"],
    freq:2,
    answer:`**WAP (Wireless Application Protocol)** is an open international standard for applications using wireless communication, e.g., internet access on mobile phones. Developed by the WAP Forum in 1998, it allowed mobile devices to access internet-like content over 2G networks.

**WAP Architecture:**
- **WAP Client:** Mobile device running a WAP browser (microbrowser)
- **WAP Gateway:** Translates between WAP and HTTP/WWW protocols
- **Web Server:** Serves WAP content (WML pages)
- **Internet:** Standard TCP/IP network

**WAP Content:**
- **WML (Wireless Markup Language):** XML-based, optimized for small screens (like stripped-down HTML)
- **WMLScript:** Client-side scripting (like JavaScript for WAP)
- **WBMP (Wireless Bitmap):** Monochrome image format for low bandwidth

**WAP Protocol Stack (from top to bottom):**

**1. WAE (Wireless Application Environment):**
- Topmost layer; contains WML, WMLScript, WTA (telephony apps)
- Application development environment

**2. WSP (Wireless Session Protocol):**
- Provides HTTP-like request/response sessions
- Two modes: connected (reliable) and connectionless
- Equivalent to HTTP in internet stack

**3. WTP (Wireless Transaction Protocol):**
- Provides transaction services
- Three classes: unreliable one-way, reliable one-way, reliable two-way
- Equivalent to TCP/UDP combined

**4. WTLS (Wireless Transport Layer Security):**
- Security layer: authentication, encryption, integrity
- Optimized version of TLS/SSL for low-bandwidth
- Equivalent to TLS/SSL in internet stack

**5. WDP (Wireless Datagram Protocol):**
- Bottom transport layer
- Adapts to underlying bearer services (SMS, GPRS, CDMA, etc.)
- Equivalent to UDP in internet stack

**WAP Today:** Largely replaced by mobile web browsers (WebKit-based), 3G/4G/5G direct internet access, and HTML5.`
  }
];

const CATS = [
  {id:"all", label:"All topics"},
  {id:"wireless", label:"Wireless & Transmission"},
  {id:"networks", label:"Mobile Networks"},
  {id:"arch", label:"Architecture"},
  {id:"os", label:"Mobile OS & Platforms"},
  {id:"apps", label:"Apps & Dev"},
  {id:"emerging", label:"Emerging Tech"},
  {id:"hot", label:"🔥 Most repeated"},
];

function FreqDots({freq, papers}) {
  return (
    <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
      <span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>Seen {freq}×</span>
      {[1,2,3,4,5,6].map(i=>(
        <div key={i} style={{width:7,height:7,borderRadius:"50%",background: i<=freq ? "#1D9E75" : "var(--color-border-secondary)"}}/>
      ))}
    </div>
  );
}

function formatAnswer(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <div key={i} style={{fontWeight:500,color:"var(--color-text-primary)",marginTop: i>0?10:0,marginBottom:2,fontSize:14}}>{line.replace(/\*\*/g,'')}</div>;
    }
    if (line.match(/^\*\*[^*]+\*\*/)) {
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <div key={i} style={{fontSize:13,lineHeight:1.7,color:"var(--color-text-secondary)",marginBottom:2}}>
          {parts.map((p,j) => j%2===1 ? <strong key={j} style={{color:"var(--color-text-primary)",fontWeight:500}}>{p}</strong> : p)}
        </div>
      );
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return <div key={i} style={{fontSize:13,lineHeight:1.7,color:"var(--color-text-secondary)",paddingLeft:16,marginBottom:1}}>• {line.slice(2)}</div>;
    }
    if (line.match(/^\d+\./)) {
      return <div key={i} style={{fontSize:13,lineHeight:1.7,color:"var(--color-text-secondary)",paddingLeft:16,marginBottom:1}}>{line}</div>;
    }
    if (line.startsWith('```')) return null;
    if (line.startsWith('|')) {
      return <div key={i} style={{fontFamily:"monospace",fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>{line}</div>;
    }
    if (line.trim()==='') return <div key={i} style={{height:6}}/>;
    return <div key={i} style={{fontSize:13,lineHeight:1.7,color:"var(--color-text-secondary)",marginBottom:2}}>{line}</div>;
  });
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [openQ, setOpenQ] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = questions;
    if (filter === "hot") list = list.filter(q => q.hot);
    else if (filter !== "all") list = list.filter(q => q.cat === filter);
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(q => q.text.toLowerCase().includes(s) || q.unit.toLowerCase().includes(s) || q.answer.toLowerCase().includes(s));
    }
    return list;
  }, [filter, search]);

  return (
    <div style={{fontFamily:"var(--font-sans)",padding:"1.5rem 1rem",maxWidth:760,margin:"0 auto"}}>

      <div style={{marginBottom:"1.5rem"}}>
        <h1 style={{fontSize:20,fontWeight:500,color:"var(--color-text-primary)",margin:0}}>IGNOU MCS-231 — Top 40 Questions &amp; Answers</h1>
        <p style={{fontSize:13,color:"var(--color-text-secondary)",marginTop:4,marginBottom:0}}>
          Compiled from 6 papers: Dec 2022, Jun 2023, Jun 2024, Dec 2024, Jun 2025, Dec 2025. Click any question to reveal the answer.
        </p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:"1rem"}}>
        {[["40","Questions"],["6","Papers"],["6","Units"],["100","Max marks"]].map(([n,l])=>(
          <div key={l} style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",padding:"0.75rem",textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:500,color:"var(--color-text-primary)"}}>{n}</div>
            <div style={{fontSize:11,color:"var(--color-text-secondary)",marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search questions or topics..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
        style={{width:"100%",padding:"8px 12px",borderRadius:"var(--border-radius-md)",marginBottom:12,fontSize:13,background:"var(--color-background-primary)",color:"var(--color-text-primary)"}}
      />

      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:"1rem"}}>
        {CATS.map(c=>(
          <button key={c.id} onClick={()=>setFilter(c.id)}
            style={{fontSize:11,padding:"5px 14px",borderRadius:20,border: filter===c.id ? "0.5px solid var(--color-border-info)" : "0.5px solid var(--color-border-secondary)",background: filter===c.id ? "var(--color-background-info)" : "var(--color-background-primary)",color: filter===c.id ? "var(--color-text-info)" : "var(--color-text-secondary)",cursor:"pointer"}}>
            {c.label}
          </button>
        ))}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(q=>(
          <div key={q.n} style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden"}}>
            <div
              onClick={()=>setOpenQ(openQ===q.n ? null : q.n)}
              style={{padding:"1rem 1.25rem",cursor:"pointer",display:"flex",gap:12,alignItems:"flex-start"}}
            >
              <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",minWidth:24,paddingTop:2,flexShrink:0}}>Q{q.n}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,color:"var(--color-text-primary)",lineHeight:1.6}}>{q.text}</div>
                <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap",alignItems:"center"}}>
                  <span style={{fontSize:11,padding:"2px 10px",borderRadius:12,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)"}}>{q.unit}</span>
                  {q.hot && <span style={{fontSize:11,padding:"2px 8px",borderRadius:12,background:"#FAECE7",color:"#993C1D",fontWeight:500}}>🔥 High priority</span>}
                  <FreqDots freq={q.freq} papers={q.papers}/>
                </div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:6}}>
                  {q.papers.map(p=>(
                    <span key={p} style={{fontSize:10,padding:"1px 7px",borderRadius:10,background:"var(--color-background-secondary)",color:"var(--color-text-tertiary)",border:"0.5px solid var(--color-border-tertiary)"}}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{fontSize:16,color:"var(--color-text-secondary)",flexShrink:0,paddingTop:2,transition:"transform .2s",transform: openQ===q.n ? "rotate(180deg)":"rotate(0deg)"}}>▾</div>
            </div>
            {openQ===q.n && (
              <div style={{borderTop:"0.5px solid var(--color-border-tertiary)",padding:"1rem 1.25rem 1rem 3.5rem",background:"var(--color-background-secondary)"}}>
                <div style={{fontSize:11,fontWeight:500,color:"var(--color-text-tertiary)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Model Answer</div>
                <div>{formatAnswer(q.answer)}</div>
              </div>
            )}
          </div>
        ))}
        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"2rem",color:"var(--color-text-secondary)",fontSize:14}}>No questions match your search.</div>
        )}
      </div>
    </div>
  );
}
