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
      title: "Big Buck Bunny",
      description:
        "Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
      genre: "Comedy",
      duration: "10 minutes",
    },
    {
      title: "Sintel",
      description:
        "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnailUrl: "http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
      genre: "Adventure",
      duration: "15 minutes",
    },
    {
      title: "Tears of Steel",
      description:
        "In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to stop an army of robots that threatens the planet.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      thumbnailUrl:
        "https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
      genre: "Action",
      duration: "12 minutes",
    },
    {
      title: "Elephant's Dream",
      description:
        "Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring the dark and twisted complex of wires, gears, and cogs, until a moment of conflict negates all their assumptions.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://download.blender.org/ED/cover.jpg",
      genre: "Sci-Fi",
      duration: "15 minutes",
    },
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
