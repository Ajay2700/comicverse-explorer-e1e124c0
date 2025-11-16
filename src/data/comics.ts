export interface Comic {
  id: string;
  title: string;
  publisher: string;
  price: number;
  coverImage: string;
  description: string;
  creators: string[];
  genre: string;
  releaseDate: string;
  pages: number;
  featured?: boolean;
}

export const comics: Comic[] = [
  {
    id: "001",
    title: "Spider-Man: Web of Shadows",
    publisher: "Marvel",
    price: 4.99,
    coverImage: "/images/spiderman-web-shadows.jpg",
    description: "When darkness falls over New York City, Spider-Man must face his greatest challenge yet. A symbiote invasion threatens to consume everything he holds dear.",
    creators: ["Dan Slott", "Humberto Ramos"],
    genre: "Superhero",
    releaseDate: "2024-01-15",
    pages: 32,
    featured: true
  },
  {
    id: "002",
    title: "Batman: Dark Knight Returns",
    publisher: "DC",
    price: 5.99,
    coverImage: "/images/batman-dark-knight.jpg",
    description: "In a dystopian Gotham City, an aging Bruce Wayne must don the cape once more to save his city from corruption and chaos.",
    creators: ["Frank Miller", "Klaus Janson"],
    genre: "Superhero",
    releaseDate: "2024-01-20",
    pages: 48,
    featured: true
  },
  {
    id: "003",
    title: "The Walking Dead: Volume 1",
    publisher: "Image",
    price: 3.99,
    coverImage: "/images/walking-dead.jpg",
    description: "A small-town police officer wakes from a coma to find the world overrun by zombies. His quest to find his family begins.",
    creators: ["Robert Kirkman", "Tony Moore"],
    genre: "Horror",
    releaseDate: "2024-02-01",
    pages: 36,
    featured: true
  },
  {
    id: "004",
    title: "Wonder Woman: Amazonia",
    publisher: "DC",
    price: 4.99,
    coverImage: "/images/wonder-woman.jpg",
    description: "Diana Prince faces an ancient threat that could destroy both the mortal world and Themyscira.",
    creators: ["Gail Simone", "Aaron Lopresti"],
    genre: "Superhero",
    releaseDate: "2024-01-25",
    pages: 32
  },
  {
    id: "005",
    title: "X-Men: Days of Future Past",
    publisher: "Marvel",
    price: 4.99,
    coverImage: "/images/xmen-future-past.jpg",
    description: "In a dark future, mutants are hunted to extinction. The X-Men must prevent this timeline from ever happening.",
    creators: ["Chris Claremont", "John Byrne"],
    genre: "Superhero",
    releaseDate: "2024-02-05",
    pages: 40
  },
  {
    id: "006",
    title: "Saga: Volume 1",
    publisher: "Image",
    price: 3.99,
    coverImage: "/images/saga.jpg",
    description: "Two soldiers from opposite sides of a never-ending galactic war fall in love and have a child together.",
    creators: ["Brian K. Vaughan", "Fiona Staples"],
    genre: "Sci-Fi",
    releaseDate: "2024-02-10",
    pages: 44
  },
  {
    id: "007",
    title: "The Flash: Rebirth",
    publisher: "DC",
    price: 4.99,
    coverImage: "/images/flash-rebirth.jpg",
    description: "Barry Allen returns from the Speed Force to reclaim his role as the Fastest Man Alive.",
    creators: ["Geoff Johns", "Ethan Van Sciver"],
    genre: "Superhero",
    releaseDate: "2024-02-15",
    pages: 32
  },
  {
    id: "008",
    title: "Thor: God of Thunder",
    publisher: "Marvel",
    price: 5.99,
    coverImage: "/images/thor-god-thunder.jpg",
    description: "Thor faces the God Butcher, a being who has killed gods across all of time.",
    creators: ["Jason Aaron", "Esad Ribić"],
    genre: "Superhero",
    releaseDate: "2024-02-20",
    pages: 40
  },
  {
    id: "009",
    title: "Invincible: Volume 1",
    publisher: "Image",
    price: 3.99,
    coverImage: "/images/invincible.jpg",
    description: "Mark Grayson discovers he has inherited superpowers from his father, the world's greatest hero.",
    creators: ["Robert Kirkman", "Cory Walker"],
    genre: "Superhero",
    releaseDate: "2024-02-25",
    pages: 36
  },
  {
    id: "010",
    title: "Justice League: Origin",
    publisher: "DC",
    price: 5.99,
    coverImage: "/images/justice-league.jpg",
    description: "The world's greatest heroes unite for the first time to face an alien invasion.",
    creators: ["Geoff Johns", "Jim Lee"],
    genre: "Superhero",
    releaseDate: "2024-03-01",
    pages: 48
  },
  {
    id: "011",
    title: "Avengers: Endgame",
    publisher: "Marvel",
    price: 5.99,
    coverImage: "/images/avengers-endgame.jpg",
    description: "Earth's Mightiest Heroes must assemble one final time to undo the devastation caused by Thanos.",
    creators: ["Jason Aaron", "Ed McGuinness"],
    genre: "Superhero",
    releaseDate: "2024-03-05",
    pages: 44
  },
  {
    id: "012",
    title: "Spawn: Origins",
    publisher: "Image",
    price: 4.99,
    coverImage: "/images/spawn-origins.jpg",
    description: "A murdered CIA agent returns from Hell as a Hellspawn to seek revenge on his killer.",
    creators: ["Todd McFarlane"],
    genre: "Dark Fantasy",
    releaseDate: "2024-03-10",
    pages: 32
  }
];

export const publishers = ["All", "Marvel", "DC", "Image"];
export const genres = ["All", "Superhero", "Horror", "Sci-Fi", "Dark Fantasy"];
