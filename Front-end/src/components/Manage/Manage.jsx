import React from "react";
import style from "./Manage.module.css";
export default function Manage() {
  const cards = [
    {
      id: 1,
      category: "architecture",
      date: "Oct 24, 2023",
      title: "The Future of Sustainable Urban Habitats",
      desc: "Exploring how minimalist design intersects...",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPDt0eLIucchmykKTYF5DSJs45TxS_hD2dO8sKyUnBWE84vP-sUKyQNyO6dsHACnDeYQELcnSY7hHUbpWFXAMaeL1g46dqfvfsVD8DZmgootFAa24xVHZCWcdKU3o4aZnMtrJIZ1uO19YsTJDIjNf2PADUHxfqKHMPt2JtAcRKa56moxAXlv2FXxRcBQJ7A9WgcSD3aTa_aRMoQxOaCSEf6B6yVDUCsmfzQiHbxGMJfghum7jC8-cbYKPiOEtzu22vrzxa4d_HWjI",
      status: "published",
    },
    {
      id: 2,
      category: "technology",
      date: "Oct 11, 2023",
      title: "Headless CMS: The Quiet Revolution",
      desc: "why decoupling content from...",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDdy2l10u8H1uiydjGtND_VSajI5LQae9Djyv1EQk8IrQez7WAlTmB8x2na6HusZiHztKhCjRu8o41rKI0yU2qtZM4iUHNvLjZsFzX7rcB-fsvf0Ym4etfeai1_P3ubvCP3ijPRa-jDjo8IKvLjcOnZbbdQm_18R5Qh8tY6tGQWpQ5BUa3BMxOQMIcuKd71H_z_D8GBZY9wYnGy-YA8mj4cq3cFZrTDBPEtqLMfRyzRCQ9-XCFmKWS-BM5xwsxDhMlfDSWCVFNak9k",
      status: "draft",
    },
    {
      id: 3,
      category: "editorial",
      date: "Oct 19, 2023",
      title: "The Art of Digital Curation",
      desc: "Beyond simple publishing: building a...",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDMEwl2-p2zUQNrw_dpqK1UKziq8G03kEDxmUS3XwrS6DxsmvXmPKHQGqwUQKyeh_b2g7sCMft8_FCc43GrRd7dIv-YrFMV0o4AqWD726vkRcKUVxPmyKyz8K_30R9vvXe9KRjHutUDr6lvfa1ziREyevO1Dei9ZJF_3HiIlTZioxUZudU_buk-JI6Go3C6nZh8ROHSibcccG40OfO1n0X3ydKhax7p9iEgaj3HObeP8zXxBZg9FDY7S6kLW8KDHiJ49wwctftnXrk",
      status: "published",
    },
  ];

  return (
    <>
      <div className={`${style.header} d-flex justify-content-around align-items-center p-3 m-3   gap-5  `}>
        <div className="d-flex align-items-center justify-content-between gap-4 mr-2"> <i className="fa-solid fa-bars"></i>
        <h1>Overview</h1></div>
       
        
          <img className={`${style.img} `} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnnBSMvWGePqp5ldkIYsdD9syNEQTa8xS2bI-9ekK6-7OirXixjLCXDnmfvoHddJztR5Yr8Jg75cgZORk07U4E7WkwxmxxKDHuQlD0m9jmRayHgpDbTPtmrYtq8PCEZEXMaMkT-6mdJrlQ7MitwAr9hH8kNimjYxBZrJ4aTgffVxoj5fNhFrf9zBDE8sMWBoVlz43-d-GgZGPflojr1pTkFH21W7uoXTByd7z8kLk_HHp6J3HTzOyaE4fpOAzEBK-Kz5dMpEE-WnU"
            alt=""/>
        
      </div>
      <div className="container">
        <h2>Manage Content</h2>
        <p>Curate and refine your editorial flow.</p>

        <input type="search" placeholder="search cards by title or keyword" />

        <button className="btn btn-primary">+ Create Card</button>
        <div className="row">
          {cards.map((card) => (
              <div className="col-md-4 mb-4" key={card.id}>
              <div className="card h-10">
                <img src={card.image} alt={card.title} />
              </div>

              <div>
                <span className="category">{card.category}</span>
                <span className="date"> {card.date}</span>
              </div>

              <div className="desc">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>

              <div className={`${status} d-flex justify-content-evenly`}>
                <span className={`${style.state} ${style[card.status]}`}>{card.status}</span>

                <i className="fa-solid fa-eye"></i>
                <i className="fa-solid fa-pencil"></i>
                <i className="fa-solid fa-trash-can"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
