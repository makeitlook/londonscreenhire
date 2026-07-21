/**
 * Central service-page data for London Screen Hire.
 *
 * ⚠️  All copy is placeholder and requires client review before launch.
 * ⚠️  heroImage paths reference the original service photography. Showcase
 *     and CTA images use the newer, service-specific production image set.
 */
import {
  LayoutGrid,
  Layers,
  Users,
  Focus,
  Maximize2,
  Plug,
  Eye,
  Sun,
  VolumeX,
  Building2,
  ShieldCheck,
  Zap,
  Cloud,
  Wrench,
  Video,
  Play,
  Palette,
  Link2,
  Music,
  Monitor,
  Tag,
  Globe,
  Volume2,
  Megaphone,
  SlidersHorizontal,
  FileCheck,
  Package,
  Radio,
  UserCheck,
  ClipboardList,
  CheckCircle2,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export interface ServiceBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceUseCase {
  title: string;
  description: string;
  /** Optional internal link if a dedicated page exists. */
  href?: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  navLabel: string;
  eyebrow: string;
  h1: string;
  shortIntro: string;
  fullIntro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroImage: string;
  heroAlt: string;
  showcaseImage: string;
  showcaseAlt: string;
  ctaImage: string;
  ctaImageAlt: string;
  /** Heading used in the final quote CTA section. */
  ctaHeading: string;
  benefits: ServiceBenefit[];
  useCases: ServiceUseCase[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  /** true = copy requires client review before launch */
  placeholder: boolean;
}

export const services: ServicePage[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. LED Screen Hire London
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "led-screen-hire-london",
    navLabel: "LED Screen Hire",
    eyebrow: "LED Screen Rental",
    h1: "LED Screen Hire London",
    shortIntro:
      "Modular LED displays and seamless video walls for indoor and outdoor events across London.",
    fullIntro:
      "London Screen Hire supplies high-quality LED screens for events of every scale. From compact display panels for conferences and exhibitions to large-format modular video walls for concerts, festivals and outdoor public screenings, our equipment is chosen for reliability and visual impact. We handle logistics, installation and on-site technical operation so you can focus on your event. Our team works with venues and production companies across London and the surrounding region.",
    primaryKeyword: "LED Screen Rental London",
    secondaryKeywords: [
      "Video Wall Hire London",
      "LED Wall Hire London",
      "LED Display Hire London",
    ],
    heroImage: "/images/services/ledscreen.png",
    heroAlt: "Large LED video wall installed at a London event",
    showcaseImage: "/images/cta/led-panel-installation-detail.jpg",
    showcaseAlt: "Technician fitting a modular LED display panel",
    ctaImage: "/images/cta/led-screen-control-desk.jpg",
    ctaImageAlt: "LED screen control desk facing a large event display",
    ctaHeading: "Request a Free LED Screen Quote",
    benefits: [
      {
        title: "Modular Video Walls",
        description:
          "Scalable panel systems configured to any size your event requires.",
        icon: LayoutGrid,
      },
      {
        title: "Indoor & Outdoor",
        description:
          "Equipment suited to controlled indoor environments and open-air event sites.",
        icon: Layers,
      },
      {
        title: "Technical Crew",
        description:
          "Qualified technicians manage installation, operation and pack-down.",
        icon: Users,
      },
      {
        title: "Pixel Pitch Options",
        description:
          "Close-viewing indoor pitch for conferences, wider pitch for large-audience outdoor displays.",
        icon: Focus,
      },
      {
        title: "Flexible Sizing",
        description:
          "Screens configured to your venue dimensions, stage layout and audience distance.",
        icon: Maximize2,
      },
      {
        title: "Full AV Integration",
        description:
          "Screens connected to your presentation, camera feed or media content seamlessly.",
        icon: Plug,
      },
    ],
    useCases: [
      {
        title: "Corporate Events",
        description:
          "Conference screens, award ceremony backdrops and product launch displays.",
        href: "/corporate-av-hire",
      },
      {
        title: "Weddings",
        description:
          "Stage backdrops, live camera feeds and photo or video content displays.",
        href: "/wedding-led-screen-hire",
      },
      {
        title: "Exhibitions",
        description:
          "Eye-catching stand displays and modular video walls for brand content.",
        href: "/exhibition-led-screen-hire",
      },
      {
        title: "Live Events",
        description:
          "Concert screens, festival IMAG panels and large public audience displays.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Enquiry & Brief",
        description:
          "Tell us about your event, venue, audience size and content requirements.",
      },
      {
        step: 2,
        title: "Specification",
        description:
          "We recommend the right screen size, pixel pitch and mounting solution for your setup.",
      },
      {
        step: 3,
        title: "Build & Install",
        description:
          "Our crew arrives at the agreed time to install, configure and test the system.",
      },
      {
        step: 4,
        title: "Live Operation",
        description:
          "A technician remains on-site during your event to manage the display.",
      },
      {
        step: 5,
        title: "Pack-Down",
        description:
          "We de-rig and remove all equipment promptly after your event concludes.",
      },
    ],
    faqs: [
      {
        question: "What LED screen sizes are available?",
        answer:
          "We can configure modular LED panels into a wide range of sizes to suit your venue. Speak to our team about your space and audience distance and we will recommend the most suitable configuration.",
      },
      {
        question: "What is pixel pitch and why does it matter?",
        answer:
          "Pixel pitch is the distance between individual LED clusters. A smaller pitch produces a sharper image at close viewing distances, which is ideal for conferences and exhibitions. A larger pitch is appropriate for outdoor or large-venue screens where the audience is further away.",
      },
      {
        question: "Can you integrate with our existing AV equipment?",
        answer:
          "Yes. Our technicians work with your existing signal sources, laptop outputs, camera systems and presentation equipment. We confirm the technical requirements during the planning stage.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "We recommend contacting us as early as possible, particularly for peak event dates. We accept enquiries for events at any stage of planning.",
      },
      {
        question: "Do you provide a technician during the event?",
        answer:
          "Yes. A qualified technician is included with all LED screen bookings to manage the display throughout your event.",
      },
    ],
    relatedSlugs: [
      "indoor-led-screen-hire",
      "outdoor-led-screen-hire",
      "corporate-av-hire",
    ],
    metaTitle: "LED Screen Hire London | Video Wall & LED Display Rental",
    metaDescription:
      "Professional LED screen and video wall hire in London. Modular indoor and outdoor LED displays for corporate events, weddings, exhibitions and live events. Get a free quote.",
    placeholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Indoor LED Screen Hire
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "indoor-led-screen-hire",
    navLabel: "Indoor LED Screens",
    eyebrow: "Indoor LED Displays",
    h1: "Indoor LED Screen Hire London",
    shortIntro:
      "High-resolution indoor LED screens for conferences, awards, weddings, exhibitions and stage backdrops.",
    fullIntro:
      "Indoor LED screens deliver sharp, vivid imagery for audiences at close and medium viewing distances. Whether you need a backdrop for a conference presentation, a stage screen for an awards ceremony or a seamless video wall for an exhibition stand, our indoor LED panels produce consistent brightness and colour across the full display surface. We carry out a detailed site assessment with your venue team to ensure the installation is safe, compliant and positioned for the best viewing angles.",
    primaryKeyword: "Indoor LED Screen Hire London",
    secondaryKeywords: [],
    heroImage: "/images/services/indoorled.png",
    heroAlt: "Indoor LED screen installed at a conference venue in London",
    showcaseImage: "/images/cta/led-wall-installation-crew.jpg",
    showcaseAlt: "Technical crew assembling a large indoor LED wall",
    ctaImage: "/images/cta/live-event-led-stage.jpg",
    ctaImageAlt: "Indoor event stage with a large LED screen and production lighting",
    ctaHeading: "Plan Your Indoor Screen Setup",
    benefits: [
      {
        title: "High Resolution",
        description:
          "Fine pixel pitch panels deliver sharp imagery for close-viewing conference and exhibition audiences.",
        icon: Eye,
      },
      {
        title: "Consistent Brightness",
        description:
          "Even brightness across the whole screen surface regardless of ambient light conditions.",
        icon: Sun,
      },
      {
        title: "Silent Operation",
        description:
          "Quiet cooling systems suitable for speech-heavy events such as conferences and ceremonies.",
        icon: VolumeX,
      },
      {
        title: "Modular Construction",
        description:
          "Panels assembled to your required dimensions and aspect ratio.",
        icon: LayoutGrid,
      },
      {
        title: "Venue Coordination",
        description:
          "We work with your venue's technical team on rigging, power and cabling.",
        icon: Building2,
      },
    ],
    useCases: [
      {
        title: "Conferences & Seminars",
        description:
          "Large-format screens for presenter content, slides and video.",
        href: "/conference-led-screen-hire",
      },
      {
        title: "Awards Ceremonies",
        description: "Stage backdrops, winner reveals and branded content.",
      },
      {
        title: "Weddings",
        description:
          "Live camera feeds, photograph and video slideshows, first dance backdrops.",
        href: "/wedding-led-screen-hire",
      },
      {
        title: "Exhibitions & Trade Shows",
        description:
          "Brand content, product video and seamless video walls for exhibition stands.",
        href: "/exhibition-led-screen-hire",
      },
      {
        title: "Product Launches",
        description:
          "High-impact display for product reveals and brand announcements.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Brief & Venue Details",
        description:
          "Share your event format, venue dimensions and viewing distances with our team.",
      },
      {
        step: 2,
        title: "Screen Recommendation",
        description:
          "We specify the correct panel resolution and screen dimensions for your audience.",
      },
      {
        step: 3,
        title: "Venue Survey",
        description:
          "We confirm rigging points, power availability and cable routes with the venue.",
      },
      {
        step: 4,
        title: "Installation & Test",
        description:
          "Our crew installs, aligns and tests the display before your event begins.",
      },
    ],
    faqs: [
      {
        question: "How close can guests be to an indoor LED screen?",
        answer:
          "Indoor LED screens with a fine pixel pitch are designed for close viewing. Our team will recommend the appropriate pitch based on your room size and typical audience distance during the quoting process.",
      },
      {
        question: "Can the screen be suspended from venue rigging?",
        answer:
          "Yes, where your venue has suitable rigging infrastructure. We confirm rigging capacity, load points and safety requirements with the venue technical team in advance.",
      },
      {
        question: "Can you display our presentation slides live on the screen?",
        answer:
          "Yes. We connect to standard laptop and presentation outputs including HDMI, SDI and other common interfaces. A technician manages the screen signal throughout your event.",
      },
      {
        question: "How early does your team need access to set up?",
        answer:
          "Setup time depends on screen size and venue access arrangements. We agree a build schedule with you and the venue in advance to minimise disruption.",
      },
    ],
    relatedSlugs: [
      "conference-led-screen-hire",
      "wedding-led-screen-hire",
      "exhibition-led-screen-hire",
    ],
    metaTitle: "Indoor LED Screen Hire London | Conference & Event Displays",
    metaDescription:
      "High-resolution indoor LED screen hire in London for conferences, award ceremonies, weddings and exhibitions. Professional installation and on-site technical support.",
    placeholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Outdoor LED Screen Hire
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "outdoor-led-screen-hire",
    navLabel: "Outdoor LED Screens",
    eyebrow: "Outdoor LED Displays",
    h1: "Outdoor LED Screen Hire London",
    shortIntro:
      "High-brightness outdoor LED screens for festivals, sporting events, public screenings and open-air occasions.",
    fullIntro:
      "Outdoor events demand screens built for higher ambient light, open sites and variable weather conditions. Our outdoor LED displays produce sufficient brightness to remain clear and legible in daylight, and our team assesses each site for structural requirements, power supply, ground conditions and audience sightlines before installation. We plan every outdoor deployment carefully to meet safety requirements and ensure the display performs reliably from event open to close.",
    primaryKeyword: "Outdoor LED Screen Hire London",
    secondaryKeywords: [],
    heroImage: "/images/services/outdoorscreen.png",
    heroAlt: "Outdoor LED screen at a London festival or public event",
    showcaseImage: "/images/cta/large-led-wall-installation.jpg",
    showcaseAlt: "Event crew installing a large-format LED wall",
    ctaImage: "/images/cta/led-wall-installation-crew.jpg",
    ctaImageAlt: "Crew building a modular LED wall for a large event",
    ctaHeading: "Request an Outdoor Screen Quote",
    benefits: [
      {
        title: "High Brightness Output",
        description:
          "Displays configured to remain visible in daylight and varied outdoor conditions.",
        icon: Sun,
      },
      {
        title: "Structural Assessment",
        description:
          "Site survey to confirm ground conditions, wind loading and installation requirements.",
        icon: ShieldCheck,
      },
      {
        title: "Power Planning",
        description:
          "Generator or mains power planning included as part of your event specification.",
        icon: Zap,
      },
      {
        title: "Large Audience Coverage",
        description:
          "Screen configurations sized for the audience distance and viewing zone of your site.",
        icon: Users,
      },
      {
        title: "Weather Consideration",
        description:
          "Equipment selected with outdoor conditions in mind. Site surveys help us plan appropriately.",
        icon: Cloud,
      },
      {
        title: "On-Site Technical Team",
        description:
          "Our crew manages the display throughout your event and responds to any technical issues.",
        icon: Wrench,
      },
    ],
    useCases: [
      {
        title: "Festivals",
        description:
          "Main stage IMAG screens and secondary audience viewing screens.",
      },
      {
        title: "Sporting Events",
        description:
          "Live match feeds, scoreboards and sponsor content for outdoor sporting venues.",
      },
      {
        title: "Public Screenings",
        description:
          "Film and broadcast screenings for public audiences in parks, squares and open spaces.",
      },
      {
        title: "Outdoor Corporate Events",
        description:
          "Product launches, company events and roadshows with outdoor display requirements.",
        href: "/corporate-av-hire",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Event Brief",
        description:
          "Share your event type, site location, expected audience and content requirements.",
      },
      {
        step: 2,
        title: "Site Survey",
        description:
          "We assess the site for ground conditions, access, power supply and sightlines.",
      },
      {
        step: 3,
        title: "Specification",
        description:
          "We specify screen size, brightness, mounting structure and power solution.",
      },
      {
        step: 4,
        title: "Installation & Test",
        description:
          "Our crew installs the full display system and tests it ahead of your event.",
      },
      {
        step: 5,
        title: "Live Support & De-rig",
        description:
          "Technical support throughout the event followed by full equipment removal.",
      },
    ],
    faqs: [
      {
        question: "Can outdoor LED screens be used in all weather conditions?",
        answer:
          "Our outdoor equipment is selected with weather exposure in mind. We assess each site individually and plan your installation accordingly. Please discuss your specific site and event dates with our team.",
      },
      {
        question: "How bright do outdoor LED screens need to be?",
        answer:
          "Outdoor screens need to be significantly brighter than indoor displays to remain legible in daylight. We specify appropriate brightness for your site conditions and expected ambient light levels.",
      },
      {
        question: "Do you carry out a site visit for outdoor events?",
        answer:
          "Yes. A site survey is an important part of our outdoor deployment process. It allows us to assess access, ground conditions, power availability and structural requirements before installation.",
      },
      {
        question: "Can you supply power generation for outdoor events?",
        answer:
          "We can advise on power requirements and help coordinate appropriate generation solutions for your event site.",
      },
    ],
    relatedSlugs: ["stage-hire", "lighting-hire", "led-screen-hire-london"],
    metaTitle: "Outdoor LED Screen Hire London | Festival & Event Displays",
    metaDescription:
      "High-brightness outdoor LED screen hire in London for festivals, sporting events and public screenings. Site survey, installation and technical support included.",
    placeholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Wedding LED Screen Hire
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "wedding-led-screen-hire",
    navLabel: "Wedding LED Screens",
    eyebrow: "Wedding Displays",
    h1: "Wedding LED Screen Hire London",
    shortIntro:
      "LED screens and video walls for wedding receptions, including backdrops, live camera feeds and photo or video presentations.",
    fullIntro:
      "A well-placed LED screen elevates a wedding reception, bringing your photography, video and live camera feed to every corner of the room. Whether you want a dramatic backdrop behind the top table, a screen for speeches and toasts, or a display for a first dance backdrop sequence, our wedding LED screens are configured to complement your venue and event design. We coordinate with your venue, wedding planner and other suppliers to ensure the installation integrates cleanly with your décor.",
    primaryKeyword: "Wedding LED Screen Hire London",
    secondaryKeywords: [],
    heroImage: "/images/services/wedding.png",
    heroAlt: "LED screen backdrop at a wedding reception venue in London",
    showcaseImage: "/images/cta/wedding-led-wall-installation.jpg",
    showcaseAlt: "Technical crew completing an LED wall installation at a wedding venue",
    ctaImage: "/images/cta/wedding-led-wall.jpg",
    ctaImageAlt: "Elegant wedding reception with a large LED wall backdrop",
    ctaHeading: "Get a Wedding Screen Quote",
    benefits: [
      {
        title: "Stage & Top Table Backdrops",
        description:
          "Striking visual backdrop for the ceremony or reception focal point.",
        icon: Monitor,
      },
      {
        title: "Live Camera Feeds",
        description:
          "Bring the ceremony or key moments to every guest in the room.",
        icon: Video,
      },
      {
        title: "Photo & Video Playback",
        description:
          "Display your engagement photos, video montages and wedding film.",
        icon: Play,
      },
      {
        title: "Custom Visual Content",
        description:
          "Display bespoke graphics, monograms or animated sequences relevant to your day.",
        icon: Palette,
      },
      {
        title: "Supplier Coordination",
        description:
          "We work alongside your venue, planner, photographer and videographer.",
        icon: Link2,
      },
      {
        title: "Lighting & Audio Packages",
        description:
          "Add lighting and audio hire to your screen package for a complete solution.",
        icon: Music,
      },
    ],
    useCases: [
      {
        title: "Ceremony Backdrop",
        description: "Dramatic screen backdrop for civil ceremonies and vows.",
      },
      {
        title: "Reception Entertainment",
        description:
          "Speeches, toasts and guest messages displayed for the whole room.",
      },
      {
        title: "First Dance",
        description:
          "Visual backdrop for the first dance sequence, coordinated with lighting.",
        href: "/lighting-hire",
      },
      {
        title: "Evening Reception",
        description:
          "DJ visuals, branded content and guest photo slideshows throughout the evening.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Wedding Brief",
        description:
          "Share your venue, date, screen size needs and the type of content you want to display.",
      },
      {
        step: 2,
        title: "Venue Coordination",
        description:
          "We contact your venue to confirm power, rigging and installation access.",
      },
      {
        step: 3,
        title: "Technical Specification",
        description:
          "We confirm the screen configuration, content sources and camera integration.",
      },
      {
        step: 4,
        title: "Setup & Rehearsal",
        description:
          "Our team sets up in advance and tests all inputs before your guests arrive.",
      },
    ],
    faqs: [
      {
        question: "Can the screen display a live feed from the ceremony?",
        answer:
          "Yes. We can connect a camera feed to the screen so guests at the back of the venue can clearly see the ceremony as it happens. We coordinate camera placement and signal routing in advance.",
      },
      {
        question: "Can we display a photo slideshow at our reception?",
        answer:
          "Yes. We can play back a photo or video slideshow from a laptop, USB media player or other source. Content format requirements are confirmed during planning.",
      },
      {
        question: "Will the screen fit with our venue's décor?",
        answer:
          "LED screens have a clean, slim profile that integrates well with most venues. We assess placement carefully to ensure the screen enhances rather than overwhelms the space.",
      },
      {
        question: "Can you also provide lighting and sound for our wedding?",
        answer:
          "Yes. We offer lighting and audio hire alongside our screen packages. See our lighting hire and corporate AV services for more information.",
      },
    ],
    relatedSlugs: [
      "lighting-hire",
      "indoor-led-screen-hire",
      "corporate-av-hire",
    ],
    metaTitle:
      "Wedding LED Screen Hire London | Backdrop & Camera Feed Displays",
    metaDescription:
      "Wedding LED screen hire in London. Stage backdrops, live camera feeds and photo or video presentations for wedding receptions and ceremonies. Enquire today.",
    placeholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Conference LED Screen Hire
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "conference-led-screen-hire",
    navLabel: "Conference Screens",
    eyebrow: "Conference Displays",
    h1: "Conference LED Screen Hire London",
    shortIntro:
      "LED presentation screens for conferences, seminars and hybrid events, displaying slides, speaker content and live camera feeds.",
    fullIntro:
      "Clear, reliable screen content is central to any successful conference. Our LED conference screens are specified to match your room layout, delegate numbers and content requirements. We integrate with standard presentation laptops, confidence monitors, camera systems and audio setups. For hybrid events, our technical team can work alongside your streaming or broadcast supplier. All equipment is tested and ready before your first delegate arrives.",
    primaryKeyword: "Conference LED Screen Hire London",
    secondaryKeywords: [],
    heroImage: "/images/services/conference.png",
    heroAlt:
      "LED screen displaying conference presentation content at a London venue",
    showcaseImage: "/images/cta/conference-led-wall-production.jpg",
    showcaseAlt: "Conference stage with LED wall and production control position",
    ctaImage: "/images/cta/corporate-conference-led-wall.jpg",
    ctaImageAlt: "Corporate conference audience facing a panoramic LED presentation wall",
    ctaHeading: "Book a Conference Screen Package",
    benefits: [
      {
        title: "Presentation Clarity",
        description:
          "High-resolution screens that display slides, data and video content sharply.",
        icon: Monitor,
      },
      {
        title: "Speaker Confidence Monitors",
        description:
          "Additional confidence screens positioned for the presenter on request.",
        icon: Eye,
      },
      {
        title: "Brand Integration",
        description:
          "Company logos, event branding and holding slides managed throughout the day.",
        icon: Tag,
      },
      {
        title: "Camera Feed Support",
        description:
          "Live camera feeds showing the speaker to all delegates in the room.",
        icon: Video,
      },
      {
        title: "Hybrid Event Ready",
        description:
          "Compatible with streaming and broadcast setups for hybrid audience formats.",
        icon: Globe,
      },
      {
        title: "Audio Integration",
        description:
          "Screen system integrated with your audio setup for video and presentation content.",
        icon: Volume2,
      },
    ],
    useCases: [
      {
        title: "Conferences & Congresses",
        description: "Main stage screens and breakout room displays.",
        href: "/corporate-av-hire",
      },
      {
        title: "Seminars & Training Days",
        description:
          "Presentation screens for smaller delegate groups in training room formats.",
      },
      {
        title: "AGMs & Shareholder Events",
        description:
          "Formal presentation screens for governance and business events.",
      },
      {
        title: "Hybrid Events",
        description:
          "Screens supporting in-room and remote delegate experiences simultaneously.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Event Brief",
        description:
          "Tell us your venue, delegate count, screen placement preference and content sources.",
      },
      {
        step: 2,
        title: "Technical Consultation",
        description:
          "We specify screen size, signal routing, confidence monitors and audio integration.",
      },
      {
        step: 3,
        title: "Pre-Event Setup",
        description:
          "Equipment installed and tested before your event begins, including presenter run-throughs.",
      },
      {
        step: 4,
        title: "On-Site Operation",
        description:
          "A technician manages the screen, signal switching and content during your event.",
      },
    ],
    faqs: [
      {
        question: "Can you display slides from multiple presenters?",
        answer:
          "Yes. Our technicians manage signal switching between multiple laptop sources and presentation feeds throughout your conference.",
      },
      {
        question: "Can the screen show a live camera feed of the speaker?",
        answer:
          "Yes. We can include a camera feed in your screen configuration so delegates across the room can clearly see the speaker, particularly in larger venues.",
      },
      {
        question: "Do you support hybrid events with a remote audience?",
        answer:
          "We can integrate with your streaming or broadcast setup. Speak to our team during the quoting process to confirm compatibility with your chosen streaming solution.",
      },
      {
        question:
          "Can we use a confidence monitor behind the screen for the presenter?",
        answer:
          "Yes. Confidence monitors are available on request and are positioned so the presenter can see their slide content without turning away from the audience.",
      },
    ],
    relatedSlugs: ["corporate-av-hire", "indoor-led-screen-hire", "stage-hire"],
    metaTitle: "Conference LED Screen Hire London | Presentation Display Hire",
    metaDescription:
      "Conference LED screen hire in London. Presentation screens, camera feeds and hybrid event display solutions for conferences, seminars and corporate events.",
    placeholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Exhibition LED Screen Hire
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "exhibition-led-screen-hire",
    navLabel: "Exhibition Screens",
    eyebrow: "Exhibition Displays",
    h1: "Exhibition LED Screen Hire London",
    shortIntro:
      "Modular LED video walls and display screens for exhibition stands, product launches and brand activations.",
    fullIntro:
      "An LED screen draws attention and communicates your brand content effectively in a busy exhibition hall. Our modular LED panels are built into configurations that suit your stand dimensions, whether that is a compact single screen or a large seamless video wall. We work with your stand builder, event organiser and exhibition venue to ensure installation complies with hall regulations and is completed on schedule. Content integration, stand coordination and technical support are all included.",
    primaryKeyword: "Exhibition LED Screen Hire London",
    secondaryKeywords: [],
    heroImage: "/images/services/exhibition.png",
    heroAlt: "LED video wall display at a London exhibition stand",
    showcaseImage: "/images/cta/led-panel-installation-detail.jpg",
    showcaseAlt: "Close-up of a technician installing a modular LED panel",
    ctaImage: "/images/cta/large-led-wall-installation.jpg",
    ctaImageAlt: "Large LED wall being installed by an event production crew",
    ctaHeading: "Request an Exhibition Screen Quote",
    benefits: [
      {
        title: "Seamless Video Walls",
        description:
          "Modular LED panels combined into a seamless display surface with no visible bezels.",
        icon: LayoutGrid,
      },
      {
        title: "Stand Coordination",
        description:
          "We work with your stand builder and exhibition organiser on timing and access.",
        icon: Link2,
      },
      {
        title: "Brand Content Display",
        description:
          "Show promotional video, product content and brand messaging to passing visitors.",
        icon: Megaphone,
      },
      {
        title: "Flexible Configurations",
        description:
          "Portrait, landscape and custom aspect ratios to fit your stand design.",
        icon: SlidersHorizontal,
      },
      {
        title: "Quick Installation",
        description:
          "Efficient build schedule to meet tight exhibition hall access windows.",
        icon: Zap,
      },
      {
        title: "Managed Content",
        description:
          "Your content loaded, tested and ready before the hall opens on the first day.",
        icon: FileCheck,
      },
    ],
    useCases: [
      {
        title: "Exhibition Stands",
        description:
          "Eye-catching video displays to draw visitors to your stand.",
      },
      {
        title: "Product Launches",
        description:
          "High-impact screens for product reveal moments and demonstrations.",
      },
      {
        title: "Brand Activations",
        description:
          "Interactive and visual brand experiences in exhibition and event environments.",
      },
      {
        title: "Trade Show Displays",
        description:
          "Screens showing product footage, testimonials and company content.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Stand Brief",
        description:
          "Share your stand dimensions, content type and installation timeline.",
      },
      {
        step: 2,
        title: "Specification",
        description:
          "We confirm screen configuration, content input and stand mounting solution.",
      },
      {
        step: 3,
        title: "Hall Coordination",
        description:
          "We liaise with your stand builder and the exhibition organiser on access and regs.",
      },
      {
        step: 4,
        title: "Install & Content Load",
        description:
          "Screen installed and content tested before the exhibition opens.",
      },
    ],
    faqs: [
      {
        question: "Can your screen fit within our stand design?",
        answer:
          "Yes. Our modular panels are configured to match your stand dimensions. Share your stand drawings with us and we will propose the best screen configuration.",
      },
      {
        question: "Will installation comply with exhibition hall regulations?",
        answer:
          "We liaise with your exhibition organiser and stand builder to ensure our installation method meets venue and hall regulations.",
      },
      {
        question: "Can we run content throughout the full exhibition day?",
        answer:
          "Yes. Our screens run continuously from hall open to close. We load and test your content before the event and ensure the system operates reliably throughout the exhibition.",
      },
      {
        question: "How quickly can you install a screen at an exhibition?",
        answer:
          "Build time depends on screen size and stand access. We agree an installation schedule with your stand builder based on the access windows available at your venue.",
      },
    ],
    relatedSlugs: [
      "corporate-av-hire",
      "indoor-led-screen-hire",
      "led-screen-hire-london",
    ],
    metaTitle:
      "Exhibition LED Screen Hire London | Video Wall & Stand Displays",
    metaDescription:
      "Exhibition LED screen hire in London. Seamless video walls and modular display screens for exhibition stands, product launches and brand activations.",
    placeholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Corporate AV Hire
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "corporate-av-hire",
    navLabel: "Corporate AV Hire",
    eyebrow: "Corporate AV Production",
    h1: "Corporate AV Hire London",
    shortIntro:
      "Complete audio, visual and production solutions for conferences, awards, product launches and hybrid corporate events.",
    fullIntro:
      "A polished corporate event requires seamless audio, video and lighting working together. London Screen Hire supplies integrated AV packages covering LED screens, professional audio systems, event lighting and staging, managed by an experienced technical production team. Whether you are planning a conference, an awards dinner, a product launch or a hybrid event with a remote audience, we coordinate the technical production from pre-event planning to post-event pack-down.",
    primaryKeyword: "Corporate AV Hire London",
    secondaryKeywords: [
      "Corporate Event Production London",
      "AV Equipment Hire London",
    ],
    heroImage: "/images/services/stage.png",
    heroAlt:
      "Corporate AV setup with LED screens, audio and lighting at a London event",
    showcaseImage: "/images/cta/live-audio-engineer.jpg",
    showcaseAlt: "Audio engineer operating a digital mixing console at a live event",
    ctaImage: "/images/cta/corporate-led-stage.jpg",
    ctaImageAlt: "Corporate event stage with a wide LED presentation wall",
    ctaHeading: "Get a Corporate AV Quote",
    benefits: [
      {
        title: "Integrated AV Packages",
        description:
          "LED screens, audio, lighting and staging supplied as a coordinated package.",
        icon: Package,
      },
      {
        title: "Experienced Production Team",
        description:
          "Technical crew experienced in corporate event production and live delivery.",
        icon: Users,
      },
      {
        title: "Live Streaming",
        description:
          "Multi-camera streaming and hybrid broadcast integration for remote audiences.",
        icon: Radio,
      },
      {
        title: "Single Point of Contact",
        description:
          "One supplier coordinating all technical production elements for your event.",
        icon: UserCheck,
      },
      {
        title: "Pre-Event Planning",
        description:
          "Detailed production planning, technical riders and run-of-show support.",
        icon: ClipboardList,
      },
      {
        title: "Reliable Delivery",
        description:
          "Careful logistics, tested equipment and professional on-site operation.",
        icon: CheckCircle2,
      },
    ],
    useCases: [
      {
        title: "Conferences",
        description:
          "Full technical production for delegate conferences and leadership summits.",
        href: "/conference-led-screen-hire",
      },
      {
        title: "Awards Ceremonies",
        description:
          "Stage, screens, audio and lighting for awards evenings and gala dinners.",
        href: "/stage-hire",
      },
      {
        title: "Product Launches",
        description: "High-impact AV for brand and product reveal events.",
      },
      {
        title: "Hybrid Events",
        description:
          "In-room AV production combined with live streaming for remote audiences.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Production Brief",
        description:
          "Share your event type, format, venue, audience size and technical requirements.",
      },
      {
        step: 2,
        title: "Technical Design",
        description:
          "We propose a full AV specification covering screens, audio, lighting and staging.",
      },
      {
        step: 3,
        title: "Pre-Production",
        description:
          "Equipment confirmed, content reviewed, run-of-show agreed with your event team.",
      },
      {
        step: 4,
        title: "Build & Rehearsal",
        description:
          "Full rig and technical rehearsal completed before guests arrive.",
      },
      {
        step: 5,
        title: "Live Event & De-rig",
        description:
          "Technical crew operate all systems throughout your event and de-rig afterwards.",
      },
    ],
    faqs: [
      {
        question: "Can you provide a complete AV package for our event?",
        answer:
          "Yes. We supply LED screens, audio systems, event lighting and staging as a coordinated package. Tell us what your event needs and we will propose a complete technical solution.",
      },
      {
        question: "Do you support live streaming for hybrid events?",
        answer:
          "We can integrate with multi-camera streaming setups for hybrid events. Speak to our team about your remote audience requirements during the quoting process.",
      },
      {
        question: "Can you work with our existing venue AV team?",
        answer:
          "Yes. We regularly work alongside in-house venue technicians. We coordinate early to agree responsibility for each technical element.",
      },
      {
        question: "How much setup time do you need before a corporate event?",
        answer:
          "Build time varies by event scale. We agree an access and build schedule with you and the venue during the planning stage.",
      },
    ],
    relatedSlugs: ["conference-led-screen-hire", "stage-hire", "lighting-hire"],
    metaTitle: "Corporate AV Hire London | Event Production & AV Equipment",
    metaDescription:
      "Corporate AV hire in London. LED screens, audio, lighting and staging packages for conferences, awards ceremonies, product launches and hybrid events.",
    placeholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Stage Hire
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "stage-hire",
    navLabel: "Stage Hire",
    eyebrow: "Stage Solutions",
    h1: "Stage Hire London",
    shortIntro:
      "Professional stage platforms and truss systems for indoor and outdoor events, integrated with screens and lighting.",
    fullIntro:
      "A well-designed stage defines the focus of your event and gives performers, speakers and presenters a clear platform. London Screen Hire supplies stage decking, raised platforms and truss structures for indoor and outdoor events. Our staging integrates directly with our LED screen and lighting hire, enabling a coordinated technical installation from a single supplier. We assess your venue or site to confirm appropriate stage dimensions, heights and access requirements.",
    primaryKeyword: "Stage Hire London",
    secondaryKeywords: [],
    heroImage: "/images/services/av.png",
    heroAlt: "Professional stage setup at a London indoor event venue",
    showcaseImage: "/images/cta/event-stage-led-wall.jpg",
    showcaseAlt: "Professional event stage with LED wall, truss and lighting",
    ctaImage: "/images/cta/live-event-led-stage.jpg",
    ctaImageAlt: "Large live-event stage with LED screen and production lighting",
    ctaHeading: "Get a Stage Hire Quote",
    benefits: [
      {
        title: "Indoor & Outdoor Stages",
        description:
          "Stage platforms for controlled indoor venues and open-air event sites.",
        icon: Layers,
      },
      {
        title: "Truss Integration",
        description:
          "Truss structures for rigging screens, lighting and audio above the performance area.",
        icon: Building2,
      },
      {
        title: "Screen Integration",
        description:
          "Stage design coordinated with LED screens for a unified technical installation.",
        icon: Monitor,
      },
      {
        title: "Lighting Integration",
        description:
          "Stage lighting rigged and managed alongside your staging structure.",
        icon: Lightbulb,
      },
      {
        title: "Access & Safety Planning",
        description:
          "Steps, ramps and safe access routes planned as part of your stage layout.",
        icon: ShieldCheck,
      },
      {
        title: "Event Suitability Assessment",
        description:
          "Staging specified to match your performance format, audience layout and venue.",
        icon: ClipboardList,
      },
    ],
    useCases: [
      {
        title: "Conferences & Summits",
        description:
          "Raised speaker stages for conference main rooms and leadership events.",
        href: "/conference-led-screen-hire",
      },
      {
        title: "Awards & Gala Dinners",
        description:
          "Presentation stages for awards evenings with integrated lighting and screens.",
        href: "/corporate-av-hire",
      },
      {
        title: "Live Music & Performances",
        description:
          "Performance stages for indoor and outdoor music, entertainment and variety shows.",
      },
      {
        title: "Outdoor Events",
        description:
          "Open-air stages for festivals, ceremonies and outdoor corporate events.",
        href: "/outdoor-led-screen-hire",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Event & Venue Brief",
        description:
          "Share your event format, expected audience, performance type and venue details.",
      },
      {
        step: 2,
        title: "Stage Specification",
        description:
          "We propose dimensions, height, truss layout and access configuration.",
      },
      {
        step: 3,
        title: "Integration Planning",
        description:
          "Stage design coordinated with screens, lighting and audio in a single technical plan.",
      },
      {
        step: 4,
        title: "Build & Safety Check",
        description:
          "Stage assembled by our crew with a pre-event safety inspection before use.",
      },
    ],
    faqs: [
      {
        question: "Can you provide staging for outdoor events?",
        answer:
          "Yes. We supply stage platforms for outdoor events. Site conditions, ground loading and access are assessed during the planning stage.",
      },
      {
        question: "Can the stage include a truss for lighting or screens?",
        answer:
          "Yes. We can include truss structures for rigging screens, lighting and audio above the stage. This is planned alongside the full technical specification for your event.",
      },
      {
        question:
          "Can you provide both staging and LED screens from a single booking?",
        answer:
          "Yes. Stage hire integrates directly with our LED screen and lighting packages, allowing you to manage your technical requirements through a single supplier.",
      },
      {
        question: "How much lead time do you need for stage hire?",
        answer:
          "We recommend enquiring as early as possible. Staging requires careful planning to coordinate with your venue access, build schedule and other suppliers.",
      },
    ],
    relatedSlugs: [
      "lighting-hire",
      "led-screen-hire-london",
      "corporate-av-hire",
    ],
    metaTitle: "Stage Hire London | Indoor & Outdoor Event Staging",
    metaDescription:
      "Professional stage hire in London for conferences, awards, live events and outdoor occasions. Truss, risers and integrated screen and lighting packages.",
    placeholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. Lighting Hire
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "lighting-hire",
    navLabel: "Lighting Hire",
    eyebrow: "Event Lighting",
    h1: "Lighting Hire London",
    shortIntro:
      "Professional event lighting for corporate events, weddings, exhibitions, stage shows and outdoor occasions.",
    fullIntro:
      "Event lighting transforms a space by setting the tone, directing attention and reinforcing your event's identity. London Screen Hire supplies stage and event lighting including wash lights, moving heads, effects and intelligent control systems. Our lighting hire integrates with staging and LED screen installations, managed by an experienced lighting technician. Whether you need understated corporate room dressing or a dramatic stage production, we specify equipment appropriate to your event scale and venue.",
    primaryKeyword: "Lighting Hire London",
    secondaryKeywords: [],
    heroImage: "/images/services/lighting.png",
    heroAlt: "Professional stage lighting at a London corporate or live event",
    showcaseImage: "/images/cta/stage-lighting-fixture.jpg",
    showcaseAlt: "Moving-head stage lights mounted on an event truss",
    ctaImage: "/images/cta/event-stage-led-wall.jpg",
    ctaImageAlt: "Event stage illuminated with blue production lighting",
    ctaHeading: "Enquire About Lighting Hire",
    benefits: [
      {
        title: "Stage Lighting",
        description:
          "Wash and spot lighting to present performers and speakers clearly.",
        icon: Sun,
      },
      {
        title: "Corporate Room Dressing",
        description:
          "Subtle event lighting that enhances your venue without overpowering it.",
        icon: Building2,
      },
      {
        title: "Wedding Lighting",
        description:
          "Ceremony and reception lighting that complements your event design.",
        icon: Palette,
      },
      {
        title: "Moving Heads & Effects",
        description:
          "Dynamic lighting effects for entertainment, concerts and evening events.",
        icon: Zap,
      },
      {
        title: "Lighting Control",
        description:
          "Technically operated control systems for programmed and live event lighting.",
        icon: SlidersHorizontal,
      },
      {
        title: "Integration with Staging & Screens",
        description:
          "Lighting coordinated with your stage and LED screen installation.",
        icon: Plug,
      },
    ],
    useCases: [
      {
        title: "Stage Shows & Performances",
        description:
          "Full wash and spot lighting rigs for performers and live entertainment.",
        href: "/stage-hire",
      },
      {
        title: "Corporate Events",
        description:
          "Room dressing, stage lighting and branded colour washes for corporate occasions.",
        href: "/corporate-av-hire",
      },
      {
        title: "Weddings",
        description:
          "Ceremony lighting, dance floor effects and venue uplighting for receptions.",
        href: "/wedding-led-screen-hire",
      },
      {
        title: "Exhibitions",
        description:
          "Stand and product lighting for exhibitions and activations.",
        href: "/exhibition-led-screen-hire",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Event Brief",
        description:
          "Describe your event format, venue, mood requirements and any specific lighting effects.",
      },
      {
        step: 2,
        title: "Lighting Design",
        description:
          "We propose a lighting specification matched to your venue, stage and audience.",
      },
      {
        step: 3,
        title: "Rig & Focus",
        description:
          "Equipment installed, rigged and focused before your event begins.",
      },
      {
        step: 4,
        title: "Technical Operation",
        description:
          "A lighting technician operates the rig throughout your event.",
      },
    ],
    faqs: [
      {
        question: "What types of lighting do you supply?",
        answer:
          "We supply a range of event lighting including wash lights, moving heads, effects units and LED colour fixtures. Equipment is specified based on your venue and event requirements.",
      },
      {
        question: "Can you provide lighting for a wedding reception?",
        answer:
          "Yes. We supply wedding lighting including ceremony uplighting, dance floor effects and reception room dressing. We can combine this with an LED screen package for a complete solution.",
      },
      {
        question: "Do you operate the lighting during the event?",
        answer:
          "Yes. A lighting technician is included with all event lighting bookings. They rig, focus and operate the system throughout your event.",
      },
      {
        question: "Can lighting be combined with staging and LED screens?",
        answer:
          "Yes. Lighting integrates directly with our staging and screen hire. A combined booking allows us to plan and install all three elements as a coordinated technical production.",
      },
    ],
    relatedSlugs: [
      "stage-hire",
      "wedding-led-screen-hire",
      "corporate-av-hire",
    ],
    metaTitle: "Lighting Hire London | Stage, Wedding & Event Lighting",
    metaDescription:
      "Professional lighting hire in London for stage shows, corporate events, weddings and exhibitions. Moving heads, wash lighting and full technical operation.",
    placeholder: true,
  },
];

/** Look up a service by its slug. Returns undefined if not found. */
export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

/** Look up multiple services by their slugs (for related services). */
export function getRelatedServices(slugs: string[]): ServicePage[] {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServicePage => s !== undefined);
}
