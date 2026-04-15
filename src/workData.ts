export type ProjectCategory = "executed" | "reimagined" | "conceptual";
export type FilterValue = "all" | ProjectCategory;

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  location: string;
  client: string;
  description: string;
  image: string;
  desktopImage?: string;
  aspectClass: string;
  spanClass: string;
  badgeClassName?: string;
  notes?: string[];
  grayscale?: boolean;
  heroTitle: string;
  heroIntro: string;
  campaignOverview: string;
  preEventMarketing: string[];
  launchEventExperience: string[];
  postEventMarketing: string[];
  campaignImpact: string[];
  preEventImages: string[];
  postEventImages: string[];
  services: string[];
  metrics: Array<{ label: string; value: string }>;
  gallery: string[];
  nextProjectSlug: string;
};

export type JournalEntry = {
  title: string;
  date: string;
  description: string;
  image: string;
};

export const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "All Projects", value: "all" },
  { label: "Executed", value: "executed" },
  { label: "Reimagined", value: "reimagined" },
  { label: "Conceptual", value: "conceptual" },
];

export const projects: Project[] = [
  {
    slug: "the-obsidian-gala",
    title: "Besan Khalaily – Spring Launch",
    category: "executed",
    year: "2024",
    location: "Launch Event / Lake Como, Italy",
    client: "Besan Khalaily",
    description:
      "A complete marketing and event campaign to launch Besan Khalaily's Spring Collection, featuring visual storytelling and an immersive fashion event.",
    image: "/WhatsApp Image 2026-04-07 at 1.23.08 PM (1).jpeg",
    desktopImage: "/cover.jpeg",
    aspectClass: "aspect-[16/9]",
    spanClass: "md:col-span-8",
    notes: ["Creative Campaigns & Concepts", "Event Concept & Production"],
    heroTitle: "A complete launch campaign for Besan Khalaily's Spring Collection.",
    heroIntro:
      "The campaign introduced the brand, showcased the dresses, and created a memorable experience for guests and potential clients.",
    campaignOverview:
      "To celebrate the launch of Besan Khalaily's first Spring Collection, we created a full marketing and event campaign designed to introduce the brand, showcase the dresses, and create a memorable experience for guests and potential clients.\n\nThe campaign combined visual storytelling, social media marketing, and a fashion launch event to build anticipation before the launch and generate strong engagement afterward.",
    preEventMarketing: [
      "Studio photoshoot to capture every dress and highlight its details.",
      "On-location photoshoot at Lake Como, Italy to create elegant visual content for the collection.",
      "Creative invitations sent to guests before the event.",
      "A magazine-style guide presenting the collection and telling the story behind each design.",
      "Moodboard teaser video reflecting the aesthetic and spirit of the collection.",
      "\"Coming Soon\" teaser videos shared on social media to build anticipation.",
      "Each step of the campaign was designed to showcase the collection visually, engage the audience, and create excitement leading up to the launch event.",
    ],
    launchEventExperience: [
      "An immersive event reflecting the vibrant, floral spirit of the Spring collection through curated decor, music, and food.",
      "A cinematic collection reveal on large screens to formally introduce the new dresses.",
      "A magazine-style guide providing guests with the detailed story behind each design.",
      "Interactive guest experiences, including a personal message booth and a 'choose your favorite dress' activity.",
      "A floral styling station linking the live event experience back to the initial invitation concept.",
      "A personal speech from the designer detailing the collection's inspiration, bringing the story to life.",
    ],
    postEventMarketing: [
      "Event recap video highlighting the experience and key moments.",
      "Guest review video capturing reactions and feedback.",
      "Individual dress videos filmed in Lake Como showcasing each design.",
      "Short-form content for social media including TikTok videos and Instagram reels.",
      "These materials helped maintain momentum after the event and reach a wider audience online.",
    ],
    campaignImpact: [
      "Increased brand awareness.",
      "Strong social media reach and engagement.",
      "High sales following the launch.",
      "Attracting new clients and potential collaborations.",
    ],
    preEventImages: [
      "/WhatsApp%20Image%202026-04-07%20at%201.23.08%20PM%20(1).jpeg",
      "/WhatsApp%20Image%202026-04-07%20at%201.23.08%20PM%20(2).jpeg",
      "/WhatsApp%20Image%202026-04-07%20at%201.23.08%20PM.jpeg",
    ],
    postEventImages: [
      "/WhatsApp%20Image%202026-04-07%20at%201.23.08%20PM%20(3).jpeg",
      "/WhatsApp%20Image%202026-04-07%20at%201.23.12%20PM.jpeg",
      "/WhatsApp%20Image%202026-04-07%20at%201.23.08%20PM%20(1).jpeg",
    ],
    services: ["Creative Campaigns & Concepts", "Event Concept & Production", "Influencer & Content Strategy"],
    metrics: [
      { label: "Photoshoots", value: "2" },
      { label: "Launch Events", value: "1" },
      { label: "Content Streams", value: "4" },
    ],
    gallery: [
      "/WhatsApp%20Image%202026-04-07%20at%201.23.08%20PM.jpeg",
      "/WhatsApp%20Image%202026-04-07%20at%201.23.08%20PM%20(2).jpeg",
      "/WhatsApp%20Image%202026-04-07%20at%201.23.12%20PM.jpeg",
    ],
    nextProjectSlug: "silk-and-silence",
  },
  {
    slug: "silk-and-silence",
    title: "Silk & Silence",
    category: "conceptual",
    year: "Proposal",
    location: "Riyadh Desert Fringe",
    client: "Confidential Fashion House",
    description:
      "An experimental blueprint for a zero-waste textile launch, exploring the juxtaposition of flowing silks against the stillness of desert monoliths.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
    aspectClass: "aspect-[3/4]",
    spanClass: "md:col-span-4",
    badgeClassName: "text-brand-primary",
    notes: ["Creative Campaigns & Concepts", "Creative Direction & Consulting"],
    heroTitle: "A textile launch imagined as moving landscape.",
    heroIntro:
      "A speculative concept for presenting delicate materials through stillness, scale, and choreographed wind.",
    campaignOverview:
      "Silk & Silence proposed a launch language where garments were never crowded by spectacle. Instead, textiles became the only motion in a landscape of mineral forms, dry air, and near-silent pacing.",
    preEventMarketing: [
      "Concept moodboards and campaign frames developed to define the poetic identity of the collection.",
      "Visual references and teaser content planned to introduce the audience to the stillness and softness of the concept.",
      "Proposal storytelling structured to align brand messaging, garment presentation, and visual anticipation.",
    ],
    launchEventExperience: [
      "Run-of-show designed around suspended textiles, mineral structures, and slow reveal pacing.",
      "Spatial styling built to make the garments the sole point of movement in the environment.",
      "Guest touchpoints imagined as quiet, tactile, and highly photographable extensions of the concept.",
    ],
    postEventMarketing: [
      "The concept was designed to scale directly into editorial assets, social storytelling, and launch communications.",
      "Each scene translated into campaign imagery, designer presentations, and high-end proposal material.",
    ],
    campaignImpact: [
      "Created a clear creative campaign territory for the brand.",
      "Unified launch thinking, spatial presentation, and content direction under one concept.",
      "Provided a visually distinctive proposal adaptable to multiple launch formats.",
    ],
    preEventImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQAK6VpaL1ue17p0dAy5-yx4gXq-bl-1nr5NHi-Ggyb6MiSeOhvBniS1lF6HJgAeDqVdDkdS1ouPYNRNRMTN2LA4EaspybLndVkq2mM_2RVKRWnexkDmsch_oza5ztN9Gi-CbsPI5-n8x7AhlCqMOTBb99jQ3naatcCJrAroohpmB5fDQxveeWTv1pRT3jvYGL80UMMbX38fsIvVaQEs4USbHtyWu6cRZf7njDYE8SNvA9biQQXe6jI8k-FRFB85PNmQtltK8pXs",
    ],
    postEventImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQAK6VpaL1ue17p0dAy5-yx4gXq-bl-1nr5NHi-Ggyb6MiSeOhvBniS1lF6HJgAeDqVdDkdS1ouPYNRNRMTN2LA4EaspybLndVkq2mM_2RVKRWnexkDmsch_oza5ztN9Gi-CbsPI5-n8x7AhlCqMOTBb99jQ3naatcCJrAroohpmB5fDQxveeWTv1pRT3jvYGL80UMMbX38fsIvVaQEs4USbHtyWu6cRZf7njDYE8SNvA9biQQXe6jI8k-FRFB85PNmQtltK8pXs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9hWu1bmoUpRm2NlsP8kLPplcEC0VZdAwj2Xeg7LQBmZQays_4-88Q8hHOxuKA--G7iQiyhKzjDzRjTocSgEacVI4q6jkI_2a8wII2lqLSZck75UbPNWsaT5DHsjvfk3AwCqmviav63F0wRY-BP6iwwAVYhnfUEDG5gX1h0wS_b5Q7TAjyaRsaNRKEAUNCExjzIoIZ4A3W623zvqyHzTZTVxVmtYyrBhwS1Vo0S2ubiWbFaMvWro-DW2Sfbp0ZNI-o0MAMRWBtmYA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
    ],
    services: ["Creative Campaigns & Concepts", "Creative Direction & Consulting", "Brand Experience"],
    metrics: [
      { label: "Waste Target", value: "0 Single Use" },
      { label: "Spatial Zones", value: "4" },
      { label: "Image Sets", value: "12 Planned" },
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQAK6VpaL1ue17p0dAy5-yx4gXq-bl-1nr5NHi-Ggyb6MiSeOhvBniS1lF6HJgAeDqVdDkdS1ouPYNRNRMTN2LA4EaspybLndVkq2mM_2RVKRWnexkDmsch_oza5ztN9Gi-CbsPI5-n8x7AhlCqMOTBb99jQ3naatcCJrAroohpmB5fDQxveeWTv1pRT3jvYGL80UMMbX38fsIvVaQEs4USbHtyWu6cRZf7njDYE8SNvA9biQQXe6jI8k-FRFB85PNmQtltK8pXs",
    ],
    nextProjectSlug: "the-alabaster-hearth",
  },
  {
    slug: "the-alabaster-hearth",
    title: "The Alabaster Hearth",
    category: "reimagined",
    year: "2023",
    location: "Boutique Hospitality Study",
    client: "Private Hospitality Group",
    description:
      "A modern interpretation of ancient communal dining, utilizing hand-fired ceramics and translucent stone to redefine luxury hospitality experiences.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQAK6VpaL1ue17p0dAy5-yx4gXq-bl-1nr5NHi-Ggyb6MiSeOhvBniS1lF6HJgAeDqVdDkdS1ouPYNRNRMTN2LA4EaspybLndVkq2mM_2RVKRWnexkDmsch_oza5ztN9Gi-CbsPI5-n8x7AhlCqMOTBb99jQ3naatcCJrAroohpmB5fDQxveeWTv1pRT3jvYGL80UMMbX38fsIvVaQEs4USbHtyWu6cRZf7njDYE8SNvA9biQQXe6jI8k-FRFB85PNmQtltK8pXs",
    aspectClass: "aspect-square",
    spanClass: "md:col-span-6",
    notes: ["Brand Experience", "Creative Direction & Consulting"],
    heroTitle: "A dining ritual reframed through warmth and stone.",
    heroIntro:
      "A hospitality concept that replaced overt luxury cues with tactility, translucency, and communal rhythm.",
    campaignOverview:
      "The Alabaster Hearth explored how a dining environment could feel ceremonial without becoming theatrical. The concept centered on layered light, tactile ceramics, and a table choreography built around shared pacing.",
    preEventMarketing: [
      "Brand mood and visual references developed to define a hospitality experience rooted in warmth and tactility.",
      "Narrative framing used to position the concept as both a dining format and a full brand experience.",
      "Conceptual assets built to guide investor presentations, spatial planning, and brand storytelling.",
    ],
    launchEventExperience: [
      "The guest journey was imagined through intimate seating, layered lighting, and a restrained ceremonial pace.",
      "Material styling connected service, interiors, and table design into one visual language.",
      "Every touchpoint was designed to support a premium but grounded brand experience.",
    ],
    postEventMarketing: [
      "The study translated into visual guidelines for future brand photography and launch storytelling.",
      "Concept outputs provided a foundation for ongoing communications around the hospitality identity.",
    ],
    campaignImpact: [
      "Clarified the future brand experience direction for the hospitality group.",
      "Created a reusable visual language across interiors, serviceware, and communication.",
      "Turned a hospitality idea into a coherent strategic concept.",
    ],
    preEventImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQAK6VpaL1ue17p0dAy5-yx4gXq-bl-1nr5NHi-Ggyb6MiSeOhvBniS1lF6HJgAeDqVdDkdS1ouPYNRNRMTN2LA4EaspybLndVkq2mM_2RVKRWnexkDmsch_oza5ztN9Gi-CbsPI5-n8x7AhlCqMOTBb99jQ3naatcCJrAroohpmB5fDQxveeWTv1pRT3jvYGL80UMMbX38fsIvVaQEs4USbHtyWu6cRZf7njDYE8SNvA9biQQXe6jI8k-FRFB85PNmQtltK8pXs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
    ],
    postEventImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9hWu1bmoUpRm2NlsP8kLPplcEC0VZdAwj2Xeg7LQBmZQays_4-88Q8hHOxuKA--G7iQiyhKzjDzRjTocSgEacVI4q6jkI_2a8wII2lqLSZck75UbPNWsaT5DHsjvfk3AwCqmviav63F0wRY-BP6iwwAVYhnfUEDG5gX1h0wS_b5Q7TAjyaRsaNRKEAUNCExjzIoIZ4A3W623zvqyHzTZTVxVmtYyrBhwS1Vo0S2ubiWbFaMvWro-DW2Sfbp0ZNI-o0MAMRWBtmYA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
    ],
    services: ["Brand Experience", "Creative Direction & Consulting", "Event Concept & Production"],
    metrics: [
      { label: "Guest Tables", value: "24 Covers" },
      { label: "Material Families", value: "3" },
      { label: "Service Chapters", value: "5" },
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQAK6VpaL1ue17p0dAy5-yx4gXq-bl-1nr5NHi-Ggyb6MiSeOhvBniS1lF6HJgAeDqVdDkdS1ouPYNRNRMTN2LA4EaspybLndVkq2mM_2RVKRWnexkDmsch_oza5ztN9Gi-CbsPI5-n8x7AhlCqMOTBb99jQ3naatcCJrAroohpmB5fDQxveeWTv1pRT3jvYGL80UMMbX38fsIvVaQEs4USbHtyWu6cRZf7njDYE8SNvA9biQQXe6jI8k-FRFB85PNmQtltK8pXs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
    ],
    nextProjectSlug: "dune-narrative",
  },
  {
    slug: "dune-narrative",
    title: "Dune Narrative",
    category: "executed",
    year: "2024",
    location: "Rub' al Khali",
    client: "Cultural Field Commission",
    description:
      "A site-specific installation across the Rub' al Khali, documenting the shifting geometry of sand through interactive light projections.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9hWu1bmoUpRm2NlsP8kLPplcEC0VZdAwj2Xeg7LQBmZQays_4-88Q8hHOxuKA--G7iQiyhKzjDzRjTocSgEacVI4q6jkI_2a8wII2lqLSZck75UbPNWsaT5DHsjvfk3AwCqmviav63F0wRY-BP6iwwAVYhnfUEDG5gX1h0wS_b5Q7TAjyaRsaNRKEAUNCExjzIoIZ4A3W623zvqyHzTZTVxVmtYyrBhwS1Vo0S2ubiWbFaMvWro-DW2Sfbp0ZNI-o0MAMRWBtmYA",
    aspectClass: "aspect-square",
    spanClass: "md:col-span-6",
    grayscale: true,
    notes: ["Influencer & Content Strategy", "Creative Campaigns & Concepts"],
    heroTitle: "Projection, horizon, and a landscape that never repeats.",
    heroIntro:
      "An installation designed to read differently every hour as the desert surface shifted under light.",
    campaignOverview:
      "Dune Narrative treated the desert as both archive and active medium. Projection layers responded to topography, wind, and human movement, turning documentation into a live spatial instrument.",
    preEventMarketing: [
      "Campaign planning focused on how the installation would perform both as a live encounter and as content.",
      "Visual strategy mapped key frames, creator angles, and narrative hooks before production began.",
      "Pre-release storytelling introduced the site and concept to build intrigue around the commission.",
    ],
    launchEventExperience: [
      "The installation unfolded through timed projection moments aligned with sunset and audience movement.",
      "On-site documentation was built into the experience so the event itself generated campaign material.",
      "Guests encountered the work as both environmental intervention and shareable visual spectacle.",
    ],
    postEventMarketing: [
      "Field footage and photography were edited into short-form campaign assets for social distribution.",
      "Content packages were structured for ongoing use across digital storytelling and partner visibility.",
      "The project narrative continued online long after the physical intervention ended.",
    ],
    campaignImpact: [
      "Delivered a strong bank of content assets from a single live activation.",
      "Extended the installation into a broader creative campaign and content strategy.",
      "Helped the commission reach audiences beyond the immediate event footprint.",
    ],
    preEventImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9hWu1bmoUpRm2NlsP8kLPplcEC0VZdAwj2Xeg7LQBmZQays_4-88Q8hHOxuKA--G7iQiyhKzjDzRjTocSgEacVI4q6jkI_2a8wII2lqLSZck75UbPNWsaT5DHsjvfk3AwCqmviav63F0wRY-BP6iwwAVYhnfUEDG5gX1h0wS_b5Q7TAjyaRsaNRKEAUNCExjzIoIZ4A3W623zvqyHzTZTVxVmtYyrBhwS1Vo0S2ubiWbFaMvWro-DW2Sfbp0ZNI-o0MAMRWBtmYA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
    ],
    postEventImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQAK6VpaL1ue17p0dAy5-yx4gXq-bl-1nr5NHi-Ggyb6MiSeOhvBniS1lF6HJgAeDqVdDkdS1ouPYNRNRMTN2LA4EaspybLndVkq2mM_2RVKRWnexkDmsch_oza5ztN9Gi-CbsPI5-n8x7AhlCqMOTBb99jQ3naatcCJrAroohpmB5fDQxveeWTv1pRT3jvYGL80UMMbX38fsIvVaQEs4USbHtyWu6cRZf7njDYE8SNvA9biQQXe6jI8k-FRFB85PNmQtltK8pXs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
    ],
    services: ["Influencer & Content Strategy", "Creative Campaigns & Concepts", "Event Concept & Production"],
    metrics: [
      { label: "Field Nights", value: "6" },
      { label: "Projection Points", value: "11" },
      { label: "Captured Assets", value: "480+" },
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9hWu1bmoUpRm2NlsP8kLPplcEC0VZdAwj2Xeg7LQBmZQays_4-88Q8hHOxuKA--G7iQiyhKzjDzRjTocSgEacVI4q6jkI_2a8wII2lqLSZck75UbPNWsaT5DHsjvfk3AwCqmviav63F0wRY-BP6iwwAVYhnfUEDG5gX1h0wS_b5Q7TAjyaRsaNRKEAUNCExjzIoIZ4A3W623zvqyHzTZTVxVmtYyrBhwS1Vo0S2ubiWbFaMvWro-DW2Sfbp0ZNI-o0MAMRWBtmYA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi49tyPLVV9M50zRv6Pc8a2HwpLZNG4XxgxAcmwLXr2XacjbBQvV0GOSieOlBEPS9eEz1y8hZdrA9FpZjY2N77lV4WT-JLSxQbyIh39RX-LJbxIX9Y1zXvM0xctN7ZA_h76yfPt6CgL_G_hjVxu9QDjKILj-P86YdbfJQRl3xt4n8yD_kRXNxcsmKDiK-2ZhcXoon0p-l6K3iRqHllFQglYz3C05H_SZv2T1ELZAd_b-ipHBtLByYK8etb8E8nDPL75H5LU_1DF2I",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzVtrUryKYMcHD7BZPDrVQc4oc3fMHPyrLmNFdnWTXTt9O5nSCTRMmjS2TbeGlZzUa4VUo2zsicXZP_KA-LDm4XmLIqgd4QNMQOSsdpKQREZNS3yqaRFn3UzQguQvJLYEY_tVntL2AetdDn2MrG3bMGP47gh22Sk6cJUd-3uVKI3doI6UmvyZ6F0UVvVRl0rzEoLBajWQV_Ut8Fy54lGA3jUyCxJf-BFr3gDHrR4L9T8BSI-7W9seCj6qLax1Fp3C4_MWyHjEoXU",
    ],
    nextProjectSlug: "the-obsidian-gala",
  },
];

export const journalEntries: JournalEntry[] = [
  {
    title: "The Poetics of Space",
    date: "March 12, 2024",
    description:
      "Exploring how minimalist architecture influences our daily emotional state.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDifCXedhWP56FCM6SA0QT2GE793ZQZ01NbNxO_Fa6klKUSyUc-PBOjEmVQISomG7RyN9RF6lOZfLVevgkAnqdhVhiJnIFHH5_VrpWhPnYlMtEXi0_Kk_pcMDiGwl35vqBpsbYzzv3RVa62j9YWvb_44Dqm_iLwBvQZoD3KJzTp3gFq1pqy2b9CsnfN-EysXy9n0kQCWm67VloWS9Vxy2LxH-7NESMFY0aUN54y6Z69W91-0dHacnluuR80I05DOl6yI5aH-4-ra2I",
  },
  {
    title: "Materiality in Digital Eras",
    date: "Feb 28, 2024",
    description:
      "Why tactile textures remain essential in an increasingly screen-bound world.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAU_aCvCouyIqo7JxXu32Do4O6lCVOpb9VBERNGqVEmDgeJfJykPNQ3IcWRymy-sIUQKVmG85xaFwDbngJcsqH6AGmUEnJOP4R289XQcCr-Jk6kopDe9q7u8HDOt64Nfbo16jk30uO28fhcSqWAkQuxyv1UIWiSlsNrnPXM4JPyCXfVmBDuTX9YxhHel5-xVdlHNtBEHNzmHypCw1LQIf_u4tzdjvJ6KM6-NaBz7zldWl2Pw6aiWWOp8rc253Iizb9TvSSJjU9GEwg",
  },
  {
    title: "Defining New Luxury",
    date: "Jan 15, 2024",
    description:
      "A shift from excess to intention: The quiet evolution of premium branding.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlqzqics8CsBXZqtk717wiMNr1SNHgU31lmcBZO7dWmQcOhfyAtfaiq4uZEvEdGKuIBde7v_tV8YHxIVOIZJo0Me_oJm6-C5nnxRLBSA1qlpa3A__zRA6q2sy3lmgi7vLGmSPibKUKmEuMnZaAkMSSVb1SVICgTNiD3AowNvvLYrCqZGfd57AggOm9sn-Cy6xCrKK4BLFlwrsumEgpaX_e8-Ejt4DgRcpC99z56_rDXqGtgjPFjCItklx0jftcL8sNH28RXyOQyNM",
  },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  executed: "Executed",
  reimagined: "Reimagined",
  conceptual: "Conceptual",
};

export function getProjectBySlug(slug: string): Project | undefined {
  try {
    const raw = localStorage.getItem("admin_portfolio_v1");
    if (raw) {
      const items = JSON.parse(raw) as Array<any>;
      const match = items.find((item) => item.slug === slug && item.status === "published");
      if (match) {
        return {
          slug: match.slug,
          title: match.title?.en ?? "",
          category: match.category,
          year: match.year,
          location: match.location?.en ?? "",
          client: match.client?.en ?? "",
          description: match.shortDescription?.en ?? "",
          image: match.coverImage,
          desktopImage: match.desktopImage || undefined,
          aspectClass: match.aspectClass,
          spanClass: match.spanClass,
          badgeClassName: match.badgeClassName || undefined,
          notes: match.notes?.en ?? [],
          grayscale: match.grayscale,
          heroTitle: match.heroTitle?.en ?? "",
          heroIntro: match.heroIntro?.en ?? "",
          campaignOverview: match.campaignOverview?.en ?? "",
          preEventMarketing: match.preEventMarketing?.en ?? [],
          launchEventExperience: match.launchEventExperience?.en ?? [],
          postEventMarketing: match.postEventMarketing?.en ?? [],
          campaignImpact: match.campaignImpact?.en ?? [],
          preEventImages: match.preEventImages ?? [],
          postEventImages: match.postEventImages ?? [],
          services: match.services?.en ?? [],
          metrics: (match.metrics ?? []).map((metric: any) => ({
            label: metric.label?.en ?? "",
            value: metric.value,
          })),
          gallery: match.gallery ?? [],
          nextProjectSlug: match.nextProjectSlug,
        };
      }
    }
  } catch {
    // Ignore localStorage errors and fall back to hardcoded content.
  }

  return projects.find((project) => project.slug === slug);
}

export function getManagedProjects(): Project[] {
  try {
    const raw = localStorage.getItem("admin_portfolio_v1");
    if (raw) {
      const items = JSON.parse(raw) as Array<any>;
      const published = items
        .filter((item) => item.status === "published")
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((item) => ({
          slug: item.slug,
          title: item.title?.en ?? "",
          category: item.category,
          year: item.year,
          location: item.location?.en ?? "",
          client: item.client?.en ?? "",
          description: item.shortDescription?.en ?? "",
          image: item.coverImage,
          desktopImage: item.desktopImage || undefined,
          aspectClass: item.aspectClass,
          spanClass: item.spanClass,
          badgeClassName: item.badgeClassName || undefined,
          notes: item.notes?.en ?? [],
          grayscale: item.grayscale,
          heroTitle: item.heroTitle?.en ?? "",
          heroIntro: item.heroIntro?.en ?? "",
          campaignOverview: item.campaignOverview?.en ?? "",
          preEventMarketing: item.preEventMarketing?.en ?? [],
          launchEventExperience: item.launchEventExperience?.en ?? [],
          postEventMarketing: item.postEventMarketing?.en ?? [],
          campaignImpact: item.campaignImpact?.en ?? [],
          preEventImages: item.preEventImages ?? [],
          postEventImages: item.postEventImages ?? [],
          services: item.services?.en ?? [],
          metrics: (item.metrics ?? []).map((metric: any) => ({
            label: metric.label?.en ?? "",
            value: metric.value,
          })),
          gallery: item.gallery ?? [],
          nextProjectSlug: item.nextProjectSlug,
        })) as Project[];

      if (published.length > 0) {
        return published;
      }
    }
  } catch {
    // Ignore localStorage errors and fall back to hardcoded content.
  }

  return projects;
}
