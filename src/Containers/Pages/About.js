import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import Avatar from "../../components/Avatar";

class About extends Component {
  render() {
    return (
      <div className="content-pages">
        <h1 className="title">História</h1>
        <p>
          Primeiro eu queria cumprimentar os internautas. -Oi Internautas!
          Depois dizer que o meio ambiente é sem dúvida nenhuma uma ameaça ao
          desenvolvimento sustentável. E isso significa que é uma ameaça pro
          futuro do nosso planeta e dos nossos países. O desemprego beira 20%,
          ou seja, 1 em cada 4 portugueses.
        </p>
        <p>
          Eu dou dinheiro pra minha filha. Eu dou dinheiro pra ela viajar, então
          é... é... Já vivi muito sem dinheiro, já vivi muito com dinheiro.
          -Jornalista: Coloca esse dinheiro na poupança que a senhora ganha R$10
          mil por mês. -Dilma: O que que é R$10 mil?
        </p>
        <h1 className="title">Criadores</h1>
        <div className="avatar-container">
          <Avatar
            name="Miguel Medeiros"
            pic="miguelmedeiros.jpg"
            role="Desenvolvedor Full-Stack"
          />
          <Avatar
            name="Don Ancapone"
            pic="miguelmedeiros.jpg"
            role="Designer 3D"
          />
          <Avatar
            name="Vicente"
            pic="vicente.png"
            role="Desenvolvedor Front-End"
          />
        </div>
      </div>
    );
  }
}

export default About;
