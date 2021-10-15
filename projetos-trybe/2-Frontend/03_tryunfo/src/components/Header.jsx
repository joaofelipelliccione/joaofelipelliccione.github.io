import React, { Component } from 'react';

class Header extends Component {
  render() {
    return(
      <header>
        <h1>Super Trunfo Constructor</h1>
        <button
          name="cyclists"
          type="button"
          onClick={() => {
            localStorage.setItem('hasTrunfo', true);
            localStorage.setItem('savedCards', '[{"cardName":"Tadej Pogačar","cardDescription":"Nacionalidade: Eslovênia | Idade: 23 | Peso: 66Kg | Altura: 1,76m | Equipe: UAE Team | Ranking UCI 2021: 1°.","cardAttr1":"90","cardAttr2":"30","cardAttr3":"90","cardImage":"https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/wijq18n5zprnvqapi6ht","cardRare":"Muito Raro","cardTrunfo":true},{"cardName":"Primož Roglič","cardDescription":"Nacionalidade: Eslovênia | Idade: 31 | Peso: 65Kg | Altura: 1,77m | Equipe: Jumbo Visma | Ranking UCI 2021: 3°.","cardAttr1":"38","cardAttr2":"26","cardAttr3":"70","cardImage":"https://www.teamjumbovisma.com/uploads/_1440x800_crop_center-center_85_none/CORVOS_00032947-113.jpg","cardRare":"Raro","cardTrunfo":false},{"cardName":"Wout van Aert","cardDescription":"Nacionalidade: Bélgica | Idade: 27 | Peso: 78Kg | Altura: 1,90m | Equipe: Jumbo Visma | Ranking UCI 2021: 2°.","cardAttr1":"70","cardAttr2":"45","cardAttr3":"80","cardImage":"https://www.digitalcycling.com.br/wp-content/uploads/2020/08/20200808_133113.jpg","cardRare":"Muito Raro","cardTrunfo":false},{"cardName":"Julian Alaphilippe","cardDescription":"Nacionalidade: França | Idade: 29 | Peso: 62Kg | Altura: 1,73m | Equipe: Quick Step | Ranking UCI 2021: 4°.","cardAttr1":"50","cardAttr2":"15","cardAttr3":"42","cardImage":"https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=ZDEznI/8aHJdiL5euTDdQPydL0zrnm0ApZHQ2sMHpg1rIq0toZJvRRcM6y+xxO8QISqgM3KZxHjfJIZJ93RUEb+OHiVHNwcX6SBM0GPFGYKMAZI=","cardRare":"Raro","cardTrunfo":false},{"cardName":"Egan Arley Bernal","cardDescription":"Nacionalidade: Colombia | Idade: 24 | Peso: 60Kg | Altura: 1,75m | Equipe: Ineos | Ranking UCI 2021: 5°.","cardAttr1":"10","cardAttr2":"67","cardAttr3":"28","cardImage":"https://cloudfront-us-east-2.images.arcpublishing.com/reuters/2LSVHZKXDBOSHJIGXFDTDXGVYE.jpg","cardRare":"Raro","cardTrunfo":false},{"cardName":"Mathieu van der Poel","cardDescription":"Nacionalidade: Holanda | Idade: 26 | Peso: 75Kg | Altura: 1,84m | Equipe: Alpecin-Fenix | Ranking UCI 2021: 7°.","cardAttr1":"26","cardAttr2":"39","cardAttr3":"31","cardImage":"https://revistaciclosul.com.br/wp-content/uploads/2020/01/Corendon-Circus-de-Mathieu-van-der-Poel-anuncia-novos-patrocinadores-e-nova-marca.jpg","cardRare":"Normal","cardTrunfo":false},{"cardName":"Richard Carapaz","cardDescription":"Nacionalidade: Equador | Idade: 28 | Peso: 62Kg | Altura: 1,70m | Equipe: Ineos | Ranking UCI 2021: 10°.","cardAttr1":"18","cardAttr2":"56","cardAttr3":"16","cardImage":"https://istoe.com.br/wp-content/uploads/sites/14/2021/07/richard-carapaz-uci-1-1280x720.jpg","cardRare":"Normal","cardTrunfo":false},{"cardName":"Alejandro Valverde","cardDescription":"Nacionalidade: Espanha | Idade: 41 | Peso: 61Kg | Altura: 1,77m | Equipe: Movistar | Ranking UCI 2021: 11°.","cardAttr1":"39","cardAttr2":"41","cardAttr3":"26","cardImage":"https://cdn.mos.cms.futurecdn.net/XrfDJrbYUXCmXsJxvtvdYN-768-80.jpg","cardRare":"Muito Raro","cardTrunfo":false},{"cardName":"Nairo Quintana","cardDescription":"Nacionalidade: Colombia | Idade: 31 | Peso: 59Kg | Altura: 1,67m | Equipe: Arkéa Samsic | Ranking UCI 2021: 64°.","cardAttr1":"32","cardAttr2":"24","cardAttr3":"27","cardImage":"https://files.rcnradio.com/public/styles/m_img_680x464/public/2020-02/nairo-quintana_1_0.jpg?itok=TttO8dIW","cardRare":"Normal","cardTrunfo":false}]');
            window.location.reload();
          }}
        >
          Super Trunfo Ciclistas
        </button>
      </header>
    );
  }
}

export default Header;