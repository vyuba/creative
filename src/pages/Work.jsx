import ProjectCard from "../components/ProjectCard";

function Work({ setCurrentProjectIndex, project }) {
  return (
    <div className="w-full h-full pt-32 pb-[150px] bg-black">
      <div className="md:hidden">
        <div className="uppercase w-full flex justify-between px-7">
          <span>Work</span>
          <span>filter</span>
        </div>
        <div className="w-full px-10 pt-5">
          <div className="w-full h-[300px]  bg-zinc-800">
            <iframe
              width="100%"
              height="100%"
              src={project.embeddedVideo}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="px-7 pt-7 h-full flex flex-col gap-4">
          <h1 className="uppercase text-sm">
            <strong>{project.title}</strong> ({project.releaseYear})
          </h1>
          <p className="uppercase text-sm">
            <strong>Genre:</strong> {project.genre}
          </p>
          <p className="uppercase text-sm">{project.description}</p>
          <ul className=" h-full  flex flex-col gap-4">
            {project.peopleWorkedWith.map((person, index) => (
              // <li key={index}>
              //     {person.role}: {person.name}
              //     {person.character && ` (Character: ${person.character})`}
              // </li>
              <li key={index} className="uppercase text-sm">
                <strong>{person.role}:</strong> {person.name}
              </li>
            ))}
          </ul>
        </div>
        <ProjectCard setCurrentProjectIndex={setCurrentProjectIndex} />
      </div>

      {/* for laptop view  */}
      <div className="w-full h-dvh text-white hidden md:block px-7 relative">
        <h1 className="text-[100px] uppercase">work</h1>
        <ul className="w-full grid gap-3 uppercase font-light text-sm pt-10 ">
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>toyota</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>acis</span>
            <span>toyota</span>
            <span>unpredictable</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w- py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
          <li className="w-full py-1 cursor-pointer grid grid-cols-4 hover:bg-white hover:text-black">
            <span>toyota</span>
            <span>quit</span>
            <span>toyota</span>
            <span>toyota</span>
          </li>
        </ul>
        <div style={{ filter: 'invert(0)',}} className="absolute bottom-[120px] right-0 w-[500px] h-[300px] bg-white">
        <video className="w-full h-full absolute inset-0 object-cover" autoPlay playsInline loop muted src='/lil uzi.mp4'></video>
        </div>
      </div>
    </div>
  );
}

export default Work;
