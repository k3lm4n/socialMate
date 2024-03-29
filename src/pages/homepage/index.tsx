import React, { useState } from "react";
import Logo from "../../assets/logo.svg";
import Home from "../../assets/home.svg";
import AboutUs from "../../assets/aboutus.svg";
import { posts } from "../../utils/dbJson";

import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import PostCardHome from "../../components/PostCardHome";

const Links = [
  {
    name: "Home",
    path: "#home",
    id: 1,
  },
  {
    name: "Posts",
    path: "#features",
    id: 2,
  },
  {
    name: "Sobre Nós",
    path: "#aboutus",
    id: 3,
  },
  {
    name: "Equipa",
    path: "#teams",
    id: 4,
  },
];

const people = [
  {
    name: "Kelman Dias dos Santos",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://media.licdn.com/dms/image/C4D03AQEabtjHx7Og4w/profile-displayphoto-shrink_800_800/0/1653379109364?e=1702512000&v=beta&t=4yiF7xDeKX6BjLMlvqUnGPyAz8zMB8cuPbRxr2-jKKU",
  },
  // More people...
];

const Homepage = () => {
  const [open, setOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div
      className=" flex bg-white justify-center flex-col text-black"
      id="home"
    >
      <div className="flex justify-center bg-white ">
        <nav
          className={
            !open
              ? "w-full h-16 flex fixed items-center justify-center content-center bg-white shadow z-10 animate-scaleOut"
              : "w-full h-screen flex fixed justify-center content-center bg-white shadow z-10 animate-scaleIn"
          }
        >
          <div
            className={
              !open
                ? "w-[85%] flex items-center justify-center content-center "
                : "w-full flex justify-center content-center "
            }
          >
            <ul
              className={
                !open
                  ? "flex flex-row w-full content-center items-center justify-between "
                  : "flex flex-col w-full content-center items-center "
              }
            >
              <div className="flex w-full flex-row items-center gap-10">
                <button
                  className="flex justify-center items-center w-14 h-14 focus:outline-none rounded lg:hidden "
                  onClick={() => setOpen(!open)}
                >
                  <div className=" flex flex-col w-full h-full justify-center items-center content-center">
                    <div
                      className={
                        !open
                          ? " my-1 h-1 w-7 bg-blue-700 bg-current transform transition duration-500 ease-in-out"
                          : " absolute h-1 w-7 bg-blue-700 bg-current transform transition duration-500 ease-in-out rotate-45 -translate-y-1.2"
                      }
                    />
                    <div
                      className={
                        !open
                          ? "  my-1 h-1 w-7 bg-blue-700 bg-current transform transition duration-500 ease-in-out"
                          : " absolute  h-1 w-5 bg-blue-700 bg-current transform transition duration-500 ease-in-out opacity-0 "
                      }
                    />
                    <div
                      className={
                        !open
                          ? "  my-1 h-1 w-7 bg-blue-700 bg-current transform transition duration-500 ease-in-out"
                          : " absolute  h-1 w-7 bg-blue-700 bg-current transform transition duration-500 ease-in-out -rotate-45  translate-y-1.2"
                      }
                    />
                  </div>
                </button>
                <a
                  href="#home"
                  onClick={handleScroll}
                  className="hover:shadow-inner transition-all duration-300 max-lg:w-full"
                >
                  <li className="flex w-full items-center justify-center h-16 ">
                    <img
                      src={Logo}
                      width={241}
                      height={31}
                      alt="Logo"
                      className=""
                    />
                  </li>
                </a>
              </div>
              <div className={!open ? "hidden lg:flex" : " flex"}>
                <div
                  className={
                    !open ? "flex items-center" : " flex items-center flex-col"
                  }
                >
                  {Links.map((link) => (
                    <li
                      key={link.id}
                      className={
                        link.path !== "#aboutus"
                          ? "h-16 w-full flex items-center justify-center mx-6 text-xl  font-inter hover-underline-animation text-black"
                          : "h-16 w-24 flex items-center justify-center mx-6 text-xl  font-inter hover-underline-animation text-black"
                      }
                    >
                      <a
                        href={link.path}
                        onClick={handleScroll}
                        className={
                          link.path !== "#aboutus"
                            ? "w-full h-16 flex items-center justify-center font-inter text-black "
                            : "w-24 h-16 flex items-center justify-center font-inter text-black "
                        }
                      >
                        <div className="w-full flex justify-center items-center">
                          {link.name}
                        </div>
                      </a>
                    </li>
                  ))}
                  <li className="h-16 w-full flex items-center justify-center mx-6 text-xl  font-inter  text-black">
                    <a
                      href="auth/login"
                      className="w-full h-16 lg:h-12 flex items-center justify-center font-inter text-black lg:text-white lg:bg-blue-500 lg:rounded-md px-6 hover:bg-blue-400  "
                    >
                      Entrar
                    </a>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>

      <div className=" bg-home w-full lg:h-[calc(100vh-10%)] flex justify-center items-center mt-16 lg:mb-0 mb-10">
        <div className=" w-[calc(100vw-20%)] lg:h-full  flex content-center lg:my-48 justify-center">
          <div className=" flex w-full items-center lg:flex-row flex-col-reverse ">
            <div className="  flex lg:flex-col w-full mx-10 h-full justify-center lg:mt-4 flex-col-reverse ">
              <div className="mt-4">
                <h1 className="lg:text-6xl text-2xl  font-inter font-bold text-black text-end">
                  Aprenda da melhor maneira
                </h1>
                <p className="lg:text-2xl text-base lg:mt-6 font-productsans font-bold text-gray-900 text-end">
                  Com a melhor plataforma
                </p>
              </div>
              <div className="flex lg:flex-row gap-4 lg:my-11 mt-4 flex-row-reverse ">
                <button className=" lg:text-2xl text-white font-inter lg:py-3 py-2 px-3 lg:px-5 rounded-md bg-blue-600  hover:shadow-lg transition-all duration-500">
                  <Link to="auth/signup">Registre-se</Link>
                </button>
                <button className=" lg:text-2xl text-black font-inter lg:py-3 py-2 px-3 lg:px-5 rounded-md border-2 border-blue-600 hover:shadow-lg transition-all duration-500">
                  <Link to="/Invite">Convide um amigo</Link>
                </button>
              </div>
            </div>

            <div className="w-full ">
              <img
                src={Home}
                width={600}
                height={500}
                alt=""
                className=" lg:w-[600px] lg:h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className=" bg-section-2 w-screen  mt-32 bg-white flex flex-col gap-y-8 justify-center items-center"
        id="features"
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-6 gap-x-10 content-center justify-center">
          {posts.map((post) => (
            <PostCardHome
              key={post.id}
              id={post.id}
              content={post.content}
              title={post.title}
              image={post.image}
              interest={post.interest}
            />
          ))}
        </div>
        <button className="btn btn-primary btn-outline ">Ver Mais</button>
      </div>
      <div
        className="bg-section-1 w-full lg:h-screen bg-white flex items-center justify-center "
        id="aboutus"
      >
        <div className=" w-[calc(100vw-20%)] bg-white py-8 flex lg:flex-row flex-col justify-center gap-11 mt-4 rounded-2xl drop-shadow-2xl">
          <img
            src={AboutUs}
            width={557}
            height={473}
            alt=""
            className=" lg:w-[557px] lg:h-[473px] "
          />

          <div className="w-full flex flex-col h-auto justify-center items-center bg-white rounded-xl max-lg:px-4 ">
            <h1 className="lg:text-4xl text-2xl w-full text-justify font-bold max-lg:px-4 ">
              Sobre nós
            </h1>
            <p className="lg:text-2xl mt-6 pr-10 text-justify font-regular text-gray-700 max-lg:px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
              vero commodi modi dicta, similique atque alias provident,
              voluptate obcaecati sapiente aut ex!...
            </p>
            <div className="w-full flex my-10 justify-end lg:justify-start mr-10">
              <button className="bg-blue-600 text-white p-3 text-lg rounded-lg">
                Ler Mais
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-section-3 w-full bg-white " id="teams">
        <div className="bg-white py-24 sm:py-32 w-full flex justify-center items-center  ">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3 place-content-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Conheça nossa liderança
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Libero fames augue nisl porttitor nisi, quis. Id ac elit odio
                vitae elementum enim vitae ullamcorper suspendisse.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 "
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={person.imageUrl}
                      alt=""
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {person.name}
                      </h3>
                      <p className="text-sm font-semibold leading-6 text-blue-600">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full bg-white ">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
