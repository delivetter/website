import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import dataImage1 from "../assets/catastro.png";
import dataImage2 from "../assets/barrios.jpg";
import dataImage3 from "../assets/walk.png";
import dataImage4 from "../assets/drive_graph.jpg";
import dataImage5 from "../assets/cids.jpg";
import dataImage6 from "../assets/supergraph.jpg";
import AvatarWithText from "@/components/pages/Home/AvatarWithText";
import Title from "@/components/layout/Title";

export default function About() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".page-transition")?.classList.add("page-active");
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const carouselData = [
    {
      src: dataImage1,
      caption:
        "Warehouses (red), stores (blue), and combined use (black) extracted using PyCatastro over Valencia's cadastral and OSM data.",
    },
    {
      src: dataImage2,
      caption: "Map showing the neighborhoods studied from Valencia.",
    },
    {
      src: dataImage3,
      caption: "Pedestrian network of the Sant Francesc neighborhood.",
    },
    {
      src: dataImage4,
      caption: "Road network of the Sant Francesc neighborhood.",
    },
    {
      src: dataImage5,
      caption: "Map showing the loading and unloading points (CID) in Valencia.",
    },
    {
      src: dataImage6,
      caption:
        "Supergraph of the Sant Francesc neighborhood, combining pedestrian and road networks.",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="page-transition">
      <div className="max-w-4xl mx-auto">
        <Title title="About Delivetter" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Project Vision</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            DELIVETTER is an academic project focused on redesigning last-mile
            delivery in urban areas through the integration of autonomous
            delivery robots. Inspired by the BotNet and ONA initiatives in
            Barcelona, we adapted the concept to the reality of Valencia,
            applying it at the neighborhood level. We designed two models to
            compare and analyse which one performs better in each zone.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>
              <strong>Model 1 (M1)</strong>: Van-based delivery with pedestrian
              segments
            </li>
            <li>
              <strong>Model 2 (M2)</strong>: Fully autonomous delivery using
              urban robots
            </li>
          </ul>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="text-primary text-4xl mb-4">
              <FaGraduationCap />
            </div>
            <h3 className="text-xl font-semibold mb-3">Academic Challenge</h3>
            <p className="text-gray-700">
              Developed as part of a Bachelor's Degree in Data Science at UPV,
              this project brings together data modeling, logistics, and
              environmental impact assessment to evaluate innovative delivery
              systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="text-secondary text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">
              Data-Driven Optimization
            </h3>
            <p className="text-gray-700">
              We apply graph theory, clustering algorithms and spatial analysis
              techniques to model real urban logistics challenges. Using Python
              and geospatial libraries, we simulate and evaluate delivery
              strategies based on travel time, distance and load balancing.
            </p>
          </motion.div>
        </div>

        {/* Sección Data Obtaining con botones minimalistas sin fondo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Data Obtaining</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We integrated data from OpenStreetMap, the Spanish Catastro, and
            Valencia's open data portal to build multimodal urban graphs. Using
            Python libraries like OSMnx and geopandas, we developed and
            simulated delivery routes optimized by walking distance, vehicle
            access, and delivery capacity.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 relative"
          >
            <img
              src={carouselData[currentIndex].src}
              alt={`Data image ${currentIndex + 1}`}
              className="rounded-lg shadow-md w-full max-w-5xl mx-auto object-cover"
              style={{ height: "500px" }}
            />
            <figcaption className="text-sm text-center text-gray-500 mt-2">
              {carouselData[currentIndex].caption}
            </figcaption>

            {/* Botones minimalistas sin fondo */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-black"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-black"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>

        {/* El resto igual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">The Team</h2>
          <p className="text-gray-700 mb-6">
            DELIVETTER was created by a multidisciplinary team of Data Science
            students from Universitat Politècnica de València:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            <AvatarWithText
              upperText="José Aguilar Camps"
              imgSrc="/src/assets/team/jose_cortado.jpg"
              className="object-bottom"
            />
            <AvatarWithText
              upperText="Anna Aparici Nogués"
              imgSrc="/src/assets/team/anna_cortado.jpg"
              className="object-bottom"
            />
            <AvatarWithText
              upperText="José Milán Server"
              imgSrc="/src/assets/team/josete_cortado.png"
              className="object-bottom"
            />
            <AvatarWithText
              upperText="Joel Moncho Mas"
              imgSrc="/src/assets/team/joel_cortado.jpg"
              className="object-bottom"
            />
            <AvatarWithText
              upperText="Juanjo Prades García"
              imgSrc="/src/assets/team/juanjo_cortado.jpg"
              className="object-bottom"
            />
            <AvatarWithText
              upperText="Daniel Reinón García"
              imgSrc="/src/assets/team/dani_cortado.jpg"
              className="object-bottom"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
