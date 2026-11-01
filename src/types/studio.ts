
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export type StudioCategory =
  | "Photo Studios"
  | "Sound Stages"
  | "Podcast Rooms"
  | "Music Suites"
  | "Art Workshops";

export interface StudioAvailability {
  days: string[];
  startTime: string;
  endTime: string;
}

export interface StudioBookingSettings {
  minimumHours: number;
  maximumHours: number;
  advanceNoticeHours: number;
}

export interface StudioListing {
  _id?: string | { $oid: string };
  title: string;
  category: StudioCategory;
  hourlyRate: number;
  rating?: number;
  reviewCount?: number;
  location: string;
  address: string;
  city: string;
  state: string;
  country: string;
  images: string[];
  capacity: number | string;
  workspaceSize: string;
  overview: string;
  equipment: string[];
  amenities: string[];
  availability?: StudioAvailability;
  status: "active" | "draft" | "inactive";
  createdAt?: string;
  userName?: string;
  userEmail?: string;
  userId?: string;
  hostName?: string;
  hostEmail?: string;
  hostId?: string;
}

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface BookingReservation {
  _id?: string | { $oid: string };
  studioId: string;
  studioTitle: string;
  studioCategory: StudioCategory;
  studioImage?: string;
  hourlyRate: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  totalCost: number;
  expectedPersons: number;
  specialRequirements?: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  hostId?: string;
  hostName?: string;
  hostEmail?: string;
  status: BookingStatus;
  createdAt?: string;
}


// Category-specific presets for dynamic amenities & gear
export const CATEGORY_PRESETS: Record<
  StudioCategory,
  { amenities: string[]; equipment: string[] }
> = {
  "Photo Studios": {
    amenities: [
      "Natural daylight / blackout curtains",
      "Hair & Makeup vanity station",
      "Dressing room",
      "Private restroom",
      "High-speed Wi-Fi",
      "Air conditioning",
      "Client lounge",
      "Drive-in / ground floor loading",
    ],
    equipment: [
      "White seamless cyc wall",
      "Profoto strobe flash heads",
      "C-stands & boom arms",
      "RGB LED panel lights",
      "Paper seamless backdrops",
      "V-flats & foam core",
      "Tethering workstation table",
      "Apple boxes & sandbags",
    ],
  },
  "Sound Stages": {
    amenities: [
      "Drive-in elephant door",
      "Green room & talent holding",
      "Production office space",
      "3-phase heavy power drops",
      "Craft services kitchenette",
      "Dedicated crew parking",
      "HVAC with silent baffle mode",
      "Hair & wardrobe area",
    ],
    equipment: [
      "Overhead pipe grid",
      "Chroma key green screen",
      "ARRI SkyPanel LED packages",
      "Distribution power boxes",
      "Grip & rigging package",
      "Production wireless monitors",
      "Soundproofing wall treatment",
      "Heavy duty rolling stands",
    ],
  },
  "Podcast Rooms": {
    amenities: [
      "Acoustically isolated room",
      "High-speed fiber internet",
      "Lounge seating for 4-6 guests",
      "Air conditioning",
      "Beverage station",
      "Smart ambient lighting control",
      "Waiting area",
    ],
    equipment: [
      "Shure SM7B microphones",
      "RODECaster Pro mixer desk",
      "Multi-camera 4K recording setup",
      "Headphone monitoring system",
      "Acoustic diffusers & bass traps",
      "Microphone boom arms",
      "LED soft-box panel lights",
      "Live streaming capture card",
    ],
  },
  "Music Suites": {
    amenities: [
      "Treated vocal isolation booth",
      "Lounge & listening couch",
      "Air conditioning",
      "High-speed Wi-Fi",
      "Private restroom",
      "Mood lighting control",
      "Secure gear storage",
    ],
    equipment: [
      "Near-field studio monitors",
      "Neumann / condenser vocal mics",
      "Audio interface / converters",
      "MIDI keyboard controller",
      "Studio headphones (high impedance)",
      "Acoustic paneling & vocal shield",
      "Direct boxes & instrument cables",
      "Preamp & hardware rack units",
    ],
  },
  "Art Workshops": {
    amenities: [
      "Slop sink / deep washing basin",
      "Natural north-facing daylight",
      "High ceilings & ventilation",
      "Concrete / washable flooring",
      "Storage shelving units",
      "Restroom & cleanup area",
      "Wi-Fi",
    ],
    equipment: [
      "Pottery wheel workstations",
      "Heavy-duty wooden workbenches",
      "Adjustable artist easels",
      "Drying racks for canvases",
      "Airbrush compressor & spray booth",
      "Ceramic kiln (electric)",
      "Hand tool & clay kit",
      "Cutting mats & clamp sets",
    ],
  },
};

export const STUDIO_CATEGORIES: StudioCategory[] = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

