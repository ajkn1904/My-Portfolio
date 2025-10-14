import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between h-screen px-20 pl-[120px]">
      <div className="max-w-xl space-y-6">
        <p className="text-gray-600 text-lg">👋 Hi There,</p>
        <h1 className="text-5xl font-bold text-gray-800">
          I Am a <span className="text-yellow-500">Developer</span>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          fringilla pretium lacus, eu luctus neque ultricies a.
        </p>
        <button className="bg-yellow-400 text-white font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition">
          👇 More About Me
        </button>

        <div className="pt-8 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <p>contact@mariam.com</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Phone:</p>
            <p>+113-804-9098</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Location:</p>
            <p>California, USA</p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-[50%] justify-end">
        <Image
          src="/hero.jpg"
          alt="Hero"
          width={600}
          height={500}
          className="rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}
