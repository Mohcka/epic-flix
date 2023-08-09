const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type MovieData = {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
};

async function main() {
  const movies: MovieData[] = [
    {
      title: "Cosmos Laundromat - First Cycle",
      description:
        "On a desolate island, suicidal sheep Franck meets his fate in a quirky salesman, who offers him the gift of a lifetime. Little does he know that he can only handle so much lifetime.",
      videoUrl: "/videos/Cosmos_Laundromat_-_First_Cycle.webm",
      thumbnailUrl: "https://i.ytimg.com/vi/Y-rmzh0PI3c/maxresdefault.jpg",
      genre: "Drama",
      duration: "12 minutes",
    },
    {
      title: "Agent 327: Operation Barbershop",
      description:
        "Agent 327 confronts his old adversary, Boris Kloris, leading to a life-or-death struggle and revealing a more deadly peril in the shop's hidden basement.",
      videoUrl: "/videos/Agent_327__Operation_Barbershop.webm",
      thumbnailUrl: "https://i.ytimg.com/vi/mN0zPOpADL4/maxresdefault.jpg",
      genre: "Action",
      duration: "4 minutes",
    },
    {
      title: "CHARGE",
      description:
        "Set in an energy-scarce dystopia, an elderly and impoverished man attempts to break into a battery factory. However, his plans are thwarted when he encounters a lethal security droid, leaving him trapped with no apparent escape route.",
      videoUrl: "/videos/charge.webm",
      thumbnailUrl: "https://i.ytimg.com/vi/UXqq0ZvbOnk/maxresdefault.jpg",
      genre: "Sci-Fi",
      duration: "4 minutes",
    },
    {
      title: "Coffee Run",
      description:
        "Fueled by caffeine, a young woman runs through the bittersweet memories of her past relationship.",
      videoUrl: "/videos/Coffee_Run.webm",
      thumbnailUrl:
        "https://www.blender.org/wp-content/uploads/2020/05/16_9_social_media_03.jpg",
      genre: "Drama",
      duration: "3 minutes",
    },
    {
      title: "Sprite Fright",
      description:
        '"Sprite Fright" is an 80\'s-inspired horror comedy set in Britain, where a group of boisterous teenagers venture into a secluded forest and encounter seemingly peaceful mushroom creatures, only to discover that these beings are an unforeseen force of nature.',
      videoUrl: "/videos/Sprite_Fright.webm",
      thumbnailUrl: "https://i.ytimg.com/vi/_cMxraX_5RE/maxresdefault.jpg",
      genre: "Action",
      duration: "10 minutes",
    },
    {
      title: "Spring",
      description:
        "Spring is the story of a shepherd girl and her dog, who face ancient spirits in order to continue the cycle of life. This poetic and visually stunning short film was written and directed by Andy Goralczyk, inspired by his childhood in the mountains of Germany.",
      videoUrl: "/videos/Spring.webm",
      thumbnailUrl: "https://i.ytimg.com/vi/WhWc3b3KhnY/maxresdefault.jpg",
      genre: "Adventure",
      duration: "8 minutes",
    },
  ];

  for (let movie of movies) {
    console.log(`Creating movie: ${movie.title}`);
    await prisma.movie.create({
      data: movie,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
