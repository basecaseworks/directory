export type DirectoryItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
};

export const items: DirectoryItem[] = [
  {
    id: "central-coffee",
    name: "Central Coffee",
    category: "Cafe",
    description: "A small neighborhood coffee shop serving filter coffee, tea, and toast.",
    location: "Central District",
  },
  {
    id: "northside-bakery",
    name: "Northside Bakery",
    category: "Cafe",
    description: "A daytime bakery with sourdough loaves, pastries, and simple lunches.",
    location: "Northside",
  },
  {
    id: "station-cafe",
    name: "Station Cafe",
    category: "Cafe",
    description: "A compact cafe near the station with quick breakfasts and fresh coffee.",
    location: "Old Station",
  },
  {
    id: "harbor-table",
    name: "Harbor Table",
    category: "Restaurant",
    description: "A casual restaurant offering a short menu of seasonal local dishes.",
    location: "Harbor Road",
  },
  {
    id: "garden-noodle-house",
    name: "Garden Noodle House",
    category: "Restaurant",
    description: "A relaxed noodle restaurant with a small garden seating area.",
    location: "West Garden",
  },
  {
    id: "corner-pizza-room",
    name: "Corner Pizza Room",
    category: "Restaurant",
    description: "A neighborhood pizza room serving thin-crust pies and salads.",
    location: "Market Corner",
  },
  {
    id: "oak-bookshop",
    name: "Oak Bookshop",
    category: "Shop",
    description: "An independent bookshop with new fiction, essays, and local history.",
    location: "Oak Street",
  },
  {
    id: "paper-and-ink",
    name: "Paper and Ink",
    category: "Shop",
    description: "A stationery shop with notebooks, pens, and desk supplies.",
    location: "Civic Square",
  },
  {
    id: "green-house-goods",
    name: "Green House Goods",
    category: "Shop",
    description: "A small shop for houseplants, pots, and basic gardening supplies.",
    location: "South Terrace",
  },
  {
    id: "riverside-repair",
    name: "Riverside Repair",
    category: "Service",
    description: "A general repair counter for small appliances and household items.",
    location: "Riverside",
  },
  {
    id: "northstar-bicycle",
    name: "Northstar Bicycle",
    category: "Service",
    description: "A bicycle workshop handling tune-ups, flat repairs, and adjustments.",
    location: "Northside",
  },
  {
    id: "bright-mend",
    name: "Bright Mend",
    category: "Service",
    description: "A clothing alteration service for repairs, hems, and simple tailoring.",
    location: "Central District",
  },
];
