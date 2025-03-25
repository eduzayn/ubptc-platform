// ... outros imports permanecem iguais ...

// Adicione a tipagem para o curso
interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  level: string;
  rating: number;
  students: number;
  image: string;
  category: string;
  featured: boolean;
  modules: number;
  certification: boolean;
}

// Adicione a tipagem para as props do CourseCard
interface CourseCardProps {
  course: Course;
}

// Corrija o CourseCard com a tipagem
const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    // ... resto do código do CourseCard permanece igual ...
  );
};

// Corrija o componente principal com React.FC
const CoursesPage: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const navigate = useNavigate();

  // ... resto do código permanece igual ...
};

export default CoursesPage;
