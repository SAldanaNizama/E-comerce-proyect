import React from 'react';

const teamMembers = [
  {
    name: 'Daniel Julcamoro ',
    role: 'Backend Developer',
    image: '/Daniel.jpg',
        description: 'Certificado en Scrum Fundamentals, con conocimientos en programación, bases de datos y desarrollo de aplicaciones web y móviles. Experiencia en servicio al cliente y habilidades para el trabajo en equipo y comunicación efectiva.'

  },
  {
    name: 'Samir Aldana',
    role: 'Frontend Developer',
    image: '/Samir.jpg',
    description: 'Apasionado desarrollador web con habilidades en JavaScript y React. Completé un ecommerce como proyecto final en Henry, demostrando mi capacidad para llevar a cabo proyectos de principio a fin. Experiencia en entornos colaborativos usando GitHub, Trello y Scrum. Busco mejorar mis habilidades y alcanzar el nivel de desarrollador senior.'
  },
  {
    name: 'Carlos Martínez',
    role: 'Full Stack Developer',
    image: 'https://via.placeholder.com/150',
    description: 'Desarrollador versátil con experiencia en JavaScript, React y SQL.'
  }
];

const TeamMemberCard = ({ member }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={member.image} alt={`${member.name}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{member.name}</div>
        <p className="text-gray-700 text-base">{member.role}</p>
        <p className="text-gray-700 text-base mt-2">{member.description}</p>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">Nuestro Equipo</h1>
      <div className="flex flex-wrap justify-center">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default About;
