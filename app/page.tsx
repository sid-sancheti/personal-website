// About me page. Content that describes men and my interests.
// Centered
// Arrow points to the sphere with a special font (My first WebGL project!!!)
import Sphere from "@/components/Sphere";

export default function Page() {
  return (
    <div>
    <p className="m-0 w-200">
      <span className="font-bold">Hello there!</span>{" "}
      <span className="text-xs">General Kenobi</span>
      <br />
      Welcome to my little corner of the internet.
      <br />
      I&apos;m a junior in Computer Science at Purdue University with a passion for 
      GenAI, networking, and security.
      <br />
      In my free time I play flag football, follow the NFL (go
      Niners!), and learn about the latest innovations in the AI sphere.
      <br />
      <br />
      Feel free to stick around and explore for a little while longer.
    </p>
    </div>
  );
}
