import React, { useEffect, useState } from 'react';
import './HeaderComponent.scss';
import NavComponent from '../NavComponent/NavComponent';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/WeGo.svg'; 

export default function HeaderComponent() {
    return (
     
        <header id='globalHeader'>
          <div id='headerContent'>
            <img src={logo} alt="WeGo Logo" />
            <div id='navContainer'>
              <NavComponent />
            </div>
          </div>
        </header>
    );
}







//#region GAMMEL KODE TIL HEADER MED KATEGORI-NAV
// // Header til produktsider med slideshow og kategori-nav
// export default function HeaderComponent(props) {
//   // loader kategorier fra backend
//   const [categories, setCategories] = useState([]);
//   const { selectedCategory, setSelectedCategory } = props;
//   const navigate = useNavigate();

//   // Hent kategorier fra backend når component loader
//   useEffect(() => {
//     fetch('http://localhost:3000/api/categories')
//       .then(res => res.json())
//       .then(data => setCategories(data))
//       .catch(() => setCategories([]));
//   }, []);

//   // finder index af valgt kategori (til pilen)
//   let selectedIdx = -1;
//   for (let i = 0; i < categories.length; i++) {
//     if (selectedCategory && categories[i].slug === selectedCategory.slug) {
//       selectedIdx = i;
//     }
//   }

//   function handleCategoryClick(cat) {
//     if (setSelectedCategory) {
//       setSelectedCategory(cat);
//     } else {
//       // Naviger til produkter med valgt kategori i query
//       navigate(`/produkter?category=${cat.slug}`);
//     }
//   }

//   return (
//     <div id='HeaderComponent'>
//       <header>
//         {/* slideshow øverst */}
//         <div id='SlideShowContainer'>
//           <Slideshow />
//           <div id='SlideshowOverlay'>
//             {/* logo og navigation */}
//             <div id='GlobalHeader'>
//               <NavLink to="/">
//                 <img src={logo} alt="WeGo Logo" />
//               </NavLink>
//               <div id='NavContainer'>
//                 <NavComponent />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* kategori navigation */}
//         <nav id='ProductNav'>
//           <ul>
//             {/* mapper kategorier */}
//             {categories.map((cat, idx) => (
//               <li
//                 key={cat.slug}
//                 className={selectedCategory && selectedCategory.slug === cat.slug ? 'active' : ''}
//                 onClick={() => handleCategoryClick(cat)}
//               >
              
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </header>
//     </div>
//   );
// }
// #endregion