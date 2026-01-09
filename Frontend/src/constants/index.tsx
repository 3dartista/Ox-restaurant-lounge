import dish1 from "../assets/dish1.jpg";
import dish2 from "../assets/dish2.jpg";
import dish3 from "../assets/dish3.jpg";
import dish4 from "../assets/dish4.jpg";
import dish5 from "../assets/dish5.jpg";
import dish6 from "../assets/dish6.jpg";
import dish7 from "../assets/dish7.jpg";
import dish8 from "../assets/dish8.jpg";
import dish9 from "../assets/dish9.jpg";
import dish10 from "../assets/dish10.jpg";

import italian from "../assets/italian.jpg";
import japanese from "../assets/japanese.jpg";
import arabian from "../assets/arabian.jpg";

import { FaLinkedin, FaWhatsapp, FaInstagram } from "react-icons/fa6";



export const LINKS = [
  { text: "Dishes", targetId: "dishes" },
  { text: "About", targetId: "about" },
  { text: "Mission", targetId: "mission" },
  { text: "Expertise", targetId: "expertise" },
  { text: "Review", targetId: "review" },
  { text: "Contact", targetId: "contact" },
];

export const DISHES = [
    {
        image: dish1,
        title: "Stake & a Glass of Red wine",
        description: "Juciy, tender, and cooked to perfection",
    },
    {
        image: dish2,
        title: "Signature Burger n Fries",
        description: "Ox Signature and chips",
    },
    {
        image: dish3,
        title: "BB Ribs",
        description: "Ox Signature Lambs",
    },
    {
        image: dish4,
        title: "Chicken-Small chops",
        description: "Ox Signature Chicken Chops",
    },
    {
        image: dish5,
        title: "Burger ColeSlaw",
        description: "Ox Burgers",
    },
    {
        image: dish6,
        title: "Ox Red-Wine n Gin",
        description: "wine and gin",
    },
    {
        image: dish7,
        title: "Bongolese Salad",
        description: "Italian Sald, Feel of Amori",
    },
    {
        image:dish8,
        title:"Ox Salad",
        description: "Ox Coleslaw",
    },
    {
        image:dish9,
        title:"Japanse rolls",
        description: "Japanese rolls",
    },
    {
        image: dish10,
        title: "Ox mojito",
        description: "Ox Mojito",
    },
    
];

export const ABOUT = {
    header: "We love cooking",
    content: "Served With Passion, Dine in and Take out.From our chef's signature creations to our attentive service, every detail is curated to ensure your visit is nothing short of exceptional. Whether you're savoring our renowned Tikka Kebab or exploring our diverse menu inspired by global flavors, each dish is a celebration of flavor and innovation. Join us for a culinary journey where every bite leaves a lasting impression. Experience Restaura—where every meal is a masterpiece.",
};

export const MISSION = 
    "At ox we love to see you dance while the food is been served.";

export const CUSINES = [
    {
        number: "01",
        image: italian,
        title: "Italian",
        description: "Experience the flavors of Italy with our exquisite Italian cuisine, featuring traditional recipes and contemporary dishes.",
    },
    {
        number: "02",
        image: japanese,
        title: "Japanese",
        description: "Delight in the art of Japanese culinary excellence, offering a fusion of classic and modern flavors.",
    },
    {
        number: "03",
        image: arabian,
        title: "Arabian",
        description: "Indulge in the rich and diverse tastes of Arabian, with a menu that celebrates the country's culinary heritage.",
    },
];

export const REVIEW = {
    name: "Jane Okoli",
    profession: "Model",
    content:
        "“As a seasoned food critic, my expectations are always high when stepping into a new dining establishment. Restaura, with its unassuming exterior and elegantly designed interior, promised a unique culinary experience from the moment I walked in. And I must say, it delivered beyond my expectations.”",
};

export const CONTACT = [
  { key: "address", value: "Address: 31 Kofo Abayomi St, Victoria Island, Lagos 106104, Lagos" },
  { key: "phone", value: "Phone: 0904-444-4454" },
  { key: "email", value: "Email: contact@oxrestaurant.com" },
];

export const SOCIAL_MEDIA_LINKS = [
    {
        href: "https://www.instagram.com/ox.restobar/",
        icon: <FaInstagram fontSize={30} className="hover:opacity-80" />,
    },
    {
        href: "https://ng.linkedin.com/in/aziz-nehme-5b0048201",
        icon: <FaLinkedin fontSize={30} className="hover:opacity-80" />,
    },
    {
        href: "wa.link/y2cvsw",
        icon: <FaWhatsapp fontSize ={30} className="hover:opacity-80" />,
    },
];