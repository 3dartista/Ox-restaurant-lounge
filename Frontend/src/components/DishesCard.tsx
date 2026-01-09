// 1. Define the "shape" of the project data
interface Project {
  image: string;
  title: string;
  description: string;
}

// 2. Tell the component that the 'project' prop follows that shape
interface DishesCardProps {
  project: Project;
}

const DishesCard = ({ project }: DishesCardProps) => {
  return (
    <div>
      <img 
        src={project.image} 
        alt={project.title}
        className="rounded-3xl p-2" 
      />
      <div className="p-4">
        <h3 className="mb-2 text-xl font-black tracking-tighter">
            {project.title}
        </h3>
        <p className="text-sm">{project.description}</p>
      </div>
    </div>
  )
}

export default DishesCard;