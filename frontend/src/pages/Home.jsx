
import  Category  from "../components/Category";

const categories = [
  { href: "/Phones", name: "Phones", imageUrl: "./phone.jpg" },
  { href: "/Consoles", name: "Consoles", imageUrl: "./console.jpg" },
  { href: "/Laptops", name: "Laptops", imageUrl: "./laptop.jpg" },
  { href: "/Computers", name: "Computers", imageUrl: "./computer.jpg" },
  { href: "/Headphones", name: "Headphones", imageUrl: "./headphone.jpg" },
  { href: "/Cameras", name: "Cameras", imageUrl: "./camera.jpg" },
  { href: "/Smartwatches", name: "Smartwatches", imageUrl: "./smartwatch.jpg" },
  { href: "/Tablets", name: "Tablets", imageUrl: "./tablet.jpg" },
];

const Home = () => {

  

  
  return (
    <div className="categoriesContainer">
   
   
      
        {categories.map((category) => (

          <Category key={category.name} category={category} />

        ))}
      
     
      

    

      
      
    

    </div>
   
  );
};

export default Home;
