import { Component, OnInit } from '@angular/core'
import { SelectItem, TreeNode } from 'primeng/api'

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'],
})
export class ProduitsComponent implements OnInit {
  societeData: any = {
    Presentation: [
      {
        titre: 'Resume',
        texte:
          "Pour ce faire, une entreprise fait appel, mobilise et consomme desressources (matérielles, humaines, financières, immatérielles et informationnelles) ce qui la conduit à devoir coordonner des fonctions (fonction d'achat, fonction commerciale, fonction informatique, etc.). Elle exerce son activité dans le cadre d'un contexte précis auquel elle doit s'adapter : un environnement plus ou moins concurrentiel, une filière technico-économique caractérisée par un état de l'art, un cadre socio-culturel et réglementaire spécifique. Elle peut se donner comme objectif de dégager un certain niveau de rentabilité.",
      },
      {
        titre: 'Our Mission',
        texte:
          "There's this notion that to grow a business, you have to be ruthless. But we know there's a better way to grow. One where what's good for the bottom line is also good for customers. We believe businesses can grow with a conscience, and succeed with a soul — and that they can do it with inbound. That's why we've created an ecosystem uniting software, education, and community to help businesses grow better every day.",
      },

      {
        titre: 'Our Story',
        texte:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      },
    ],
    Fiche: [
      {
        titre: 'Resume',
        texte:
          "Pour ce faire, une entreprise fait appel, mobilise et consomme desressources (matérielles, humaines, financières, immatérielles et informationnelles) ce qui la conduit à devoir coordonner des fonctions (fonction d'achat, fonction commerciale, fonction informatique, etc.). Elle exerce son activité dans le cadre d'un contexte précis auquel elle doit s'adapter : un environnement plus ou moins concurrentiel, une filière technico-économique caractérisée par un état de l'art, un cadre socio-culturel et réglementaire spécifique. Elle peut se donner comme objectif de dégager un certain niveau de rentabilité.",
      },
      {
        titre: 'Our Mission',
        texte:
          "There's this notion that to grow a business, you have to be ruthless. But we know there's a better way to grow. One where what's good for the bottom line is also good for customers. We believe businesses can grow with a conscience, and succeed with a soul — and that they can do it with inbound. That's why we've created an ecosystem uniting software, education, and community to help businesses grow better every day.",
      },

      {
        titre: 'Our Story',
        texte:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      },
    ],
    histoire: [
      {
        titre: 'Notre Histoire',
        texte:
          "Dell Technologies, Inc est une entreprise américaine troisième plus grand constructeur d'ordinateurs au monde en 2012 derrière Hewlett-Packard et Lenovo2. Son siège est basé à Round Rock dans l'État du Texas.\n Même si Dell Computer est surtout connu pour les PC qu'il conçoit, fabrique et vend aux particuliers et aux professionnels, il est également présent sur les marchés de serveurs d'entreprise, de systèmes de sauvegarde et stockage de données et du matériel spécifique aux réseaux informatiques.\n Dell propose également des logiciels et des périphériques comme des imprimantes, appareils photos numériques, et beaucoup d'autres encore. Dell était coté au Nasdaq à New York sous le symbole DELL jusqu'en 2013, sorti de la bourse en 2013 et réintroduit en 2018.",
      },

      {
        titre: 'Our Story',
        texte:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      },
    ],
    gallerie: [
      {
        previewImageSrc:
          'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp',
        thumbnailImageSrc:
          'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp',
        alt: 'Description for Image 1',
        title: 'Title 1',
        type: 'image',
      },
      {
        previewImageSrc:
          'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
        thumbnailImageSrc:
          'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
        alt: 'Description for Image 2',
        title: 'Title 2',
        type: 'image',
      },
      {
        previewImageSrc: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
        thumbnailImageSrc: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
        alt: 'Description for Image 3',
        title: 'Title 3',
        type: 'image',
      },
      {
        previewImageSrc: 'assets/videos/ash-mosaique.mp4',
        thumbnailImageSrc: 'assets/images/video-img.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4',
        type: 'video',
      },
    ],
    Produits: [
      {
        id: 1,
        titre: 'Product 1',
        categorie: 'Sandales',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image:
          'https://img01.ztat.net/article/spp-media-p1/d0a87e30bd8030d690b0213d248b2378/a0e9e6e779d747688b5a832e78981c9f.jpg?imwidth=300&filter=packshot',
        price: '200Dh',
        rating: 5,
        promo: {
          taux: '-40%',
          promoPrice: '100DH',
        },
        livraison: 'gratuite',
        others: [
          {
            id: 110,

            image:
              'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',
            name: 'Product 1235',
            categorie: 'Sandales',
            price: '189Dh',
            rating: 5,
            promo: {
              taux: '-40%',
              promoPrice: '100DH',
            },
          },
          {
            id: 120,

            categorie: 'Sandales',
            image:
              'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',
            name: 'Product 56874',
            price: 350,
            rating: 1,
          },
          {
            categorie: 'Sandales',
            image:
              'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=50&filter=packshot',
            name: 'Product dd45',
            price: '75Dh',
            rating: 3.5,
          },
        ],
      },
      {
        id: 2,

        titre: 'Product 2',
        categorie: 'Chaussures',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image:
          'https://themes.pixelstrap.com/multikart/assets/images/pro3/27.jpg',
        price: '300Dh',
        rating: 2,
        others: [
          {
            id: 210,

            image:
              'https://themes.pixelstrap.com/multikart/assets/images/pro3/34.jpg',
            name: 'name prod',
            price: '98.5Dh',
            rating: 4.5,
          },
        ],
      },
      {
        id: 3654,

        titre: 'Product 3',
        categorie: 'Accessoires',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/antique.png',
        price: '400Dh',
        rating: 1,
      },
      {
        id: 48787,

        titre: 'Product 4',
        categorie: 'Sport',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        price: '500Dh',
        rating: 2,
      },
      {
        id: 5545,
        titre: 'Product 1',
        categorie: 'Computer',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image:
          'https://img01.ztat.net/article/spp-media-p1/d0a87e30bd8030d690b0213d248b2378/a0e9e6e779d747688b5a832e78981c9f.jpg?imwidth=300&filter=packshot',
        price: '200Dh',
        rating: 5,
        promo: {
          taux: '-40%',
          promoPrice: '100DH',
        },
        livraison: 'gratuite',
        others: [
          {
            id: 7875,

            image:
              'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',
            name: '',
            price: '189Dh',
            rating: 5,
            promo: {
              taux: '-40%',
              promoPrice: '100DH',
            },
          },
          {
            id: 56864,

            image:
              'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',
            name: '',
            price: 350,
            rating: 1,
          },
          {
            image:
              'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=50&filter=packshot',
            name: '',
            price: '75Dh',
            rating: 3.5,
          },
        ],
      },
      {
        id: 62,

        titre: 'Product 2',
        categorie: 'Chaussures',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image:
          'https://themes.pixelstrap.com/multikart/assets/images/pro3/27.jpg',
        price: '300Dh',
        rating: 2,
        others: [
          {
            id: 5642145,

            image:
              'https://themes.pixelstrap.com/multikart/assets/images/pro3/34.jpg',
            name: '',
            price: '98.5Dh',
            rating: 4.5,
          },
        ],
      },
      {
        id: 114548745,
        titre: 'Product Test',
        categorie: 'Sandales',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image:
          'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',

        price: '45800Dh',
        rating: 5,
        promo: {
          taux: '-40%',
          promoPrice: '100DH',
        },
        livraison: 'gratuite',
        others: [],
      },
    ],
    Promo: [
      {
        titre: 'Product 1',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        price: '200Dh',
      },
      {
        titre: 'Product 2',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/car.png',
        price: '300Dh',
      },
      {
        titre: 'Product 3',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/antique.png',
        price: '400Dh',
      },
      {
        titre: 'Product 4',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        price: '500Dh',
      },
    ],
    Documents: [
      {
        titre: 'Document 1',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        dateEdition: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Document 2',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/car.png',
        dateEdition: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Document 3',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/antique.png',
        dateEdition: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Document 4',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        dateEdition: '2016-05-18T16:00:00Z',
      },
    ],
    QuestionReponse: [
      {
        question: 'Est-ce si compliqué de créer son entreprise ?',
        reponse:
          ' On considère généralement que la création d’entreprise est compliquée, mais le raisonnement se limite – et c’est une erreur – aux formalités de création de l’entreprise c’est-à-dire aux démarches à accomplir pour lui donner naissance et l’immatriculer. Ce formalisme est, en effet, parfois complexe.',
      },
      {
        question: "Quelle est l'adresse de Patek Philippe France ?",
        reponse:
          ' Patek Philippe France est situé au 10 pl Vendôme, 75001 Paris',
      },
      {
        question:
          'Quelles sont les prestations et services que propose SOS Médecins Paris19 Visites, Consultations et Téléconsultations ? ',
        reponse:
          '  SOS Médecins Paris19 Visites, Consultations et Téléconsultations propose les prestations et services suivants: 24h/24, 7j/7 / Visites à domicile / Soins techniques',
      },
    ],
    evenement: [
      {
        date_debut: '2022-05-15',
        date_fin: ' 2022-07-26',
        titre: 'Titre Evenet 1',
        description: 'Description Accusantium sint del',
        img: 'assets/images/event.jpg',
        localisation: '120, BD La Resistance',
      },
      {
        date_debut: '2022-04-15',
        date_fin: ' 2022-09-01',
        titre: 'Titre Evenet 2',
        description: 'Description Accusantium sint del',
        img: 'assets/images/event.jpg',
        localisation: '200, BD La Mohammed 5',
      },
      {
        date_debut: '2022-01-01',
        date_fin: ' 2022-12-26',
        titre: 'Titre Evenet 3',
        description: 'Description Accusantium sint del',
        img: 'assets/images/event.jpg',
        localisation: '120, BD La Rencontre',
      },
    ],
    equipe: [
      {
        name: 'Hicham',
        prenom: 'Berdouki',
        fonction: 'MEAN Stack Developper',
      },
      {
        name: 'Soufiane',
        prenom: 'Soufiane',
        fonction: 'MEAN Stack Developper',
      },
      {
        name: 'Samira',
        prenom: 'Samira',
        fonction: 'MEAN Stack Developper',
      },
      {
        name: 'Jouhaina',
        prenom: 'Jouhaina',
        fonction: 'Data Analyst',
      },
    ],
    Filiale: [
      {
        image: 'assets/images/organisation.jpg',
        name: 'Societe Filiale',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
      {
        image: 'assets/images/organisation.jpg',
        name: 'Societe Filiale 2',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
      {
        image: 'assets/images/societe.jpg',
        name: 'Societe Filiale 3',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
    ],
    Partenaire: [
      {
        image: 'assets/images/organisation.jpg',
        name: 'Societe Partenaire',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
      {
        image: 'assets/images/societe.jpg',
        name: 'Societe Partenaire 2',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
      {
        image: 'assets/images/societe.jpg',
        name: 'Societe Partenaire 3',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
    ],
    Distinction: [
      {
        image: 'assets/images/logo-lux.webp.jpg',
        titre: 'Trophé De Qualité',
        resume:
          'EDITEO vous propose différentes techniques et matériaux, pour réaliser vos trophées d’entreprise. es en bois…les possibilités sont nombreuses.Nos trophées d’entreprise sont le fruit d’un travail créatif sur un objet hautement porteur de sens.',
        date: '2022-05-01',
      },
      {
        image: 'assets/images/organisation.jpg',
        titre: 'Trophé De Service 2',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        date: '2022-05-25',
      },
    ],
    Presse: [
      {
        titre: 'Passage à la télévision TV5',
        resume:
          'Le développement de l’offre est également de mise. La note d’orientations trace également les grandes lignes du déploiement de la 5G. La note prévoit dans ce sens l’élaboration d’une étude pour proposer ',
        link:
          'https://themeforest.net/item/globo-directory-psd-template/screenshots/8887389?index=1',
      },
      {
        titre: 'Passage à la Radio AbC',
        resume:
          'La Caisse de compensation remplit toutes ses fonctions et continue à subventionner les prix des produits de base de grande consommation, a relevé Lekjaa, qui répondait à des questions orales à la Chambre des représentants',

        link:
          'https://preview.themeforest.net/item/globo-directory-listings-html-template/full_screen_preview/9321666?_ga=2.163585023.1176889460.1652183399-114440090.1652183399',
      },
    ],
    ActionSociale: [
      {
        titre: 'Titre Article 1',
        resume:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        date: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Titre Article 2',
        resume:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/car.png',
        date: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Titre Article 3',
        resume:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/antique.png',
        date: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Titre Article 4',
        resume:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        date: '2016-05-18T16:00:00Z',
      },
    ],
  }
  constructor() {}
  filter_value: any = ''

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ]
    this.items = [
      {
        label: 'A Propos',
        icon: 'pi pi-fw pi-home',
        children: {
          Apropos: [
            {
              titre: 'Resume',
              texte:
                "Pour ce faire, une entreprise fait appel, mobilise et consomme desressources (matérielles, humaines, financières, immatérielles et informationnelles) ce qui la conduit à devoir coordonner des fonctions (fonction d'achat, fonction commerciale, fonction informatique, etc.). Elle exerce son activité dans le cadre d'un contexte précis auquel elle doit s'adapter : un environnement plus ou moins concurrentiel, une filière technico-économique caractérisée par un état de l'art, un cadre socio-culturel et réglementaire spécifique. Elle peut se donner comme objectif de dégager un certain niveau de rentabilité.",
            },
            {
              titre: 'Our Mission',
              texte:
                "There's this notion that to grow a business, you have to be ruthless. But we know there's a better way to grow. One where what's good for the bottom line is also good for customers. We believe businesses can grow with a conscience, and succeed with a soul — and that they can do it with inbound. That's why we've created an ecosystem uniting software, education, and community to help businesses grow better every day.",
            },

            {
              titre: 'Our Story',
              texte:
                "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
            },
          ],
        },
      },
      {
        label: 'Histoire',
        icon: 'pi pi-fw pi-calendar',
        children: [
          {
            histoire: [
              {
                titre: 'Notre Histoire',
                texte:
                  "Dell Technologies, Inc est une entreprise américaine troisième plus grand constructeur d'ordinateurs au monde en 2012 derrière Hewlett-Packard et Lenovo2. Son siège est basé à Round Rock dans l'État du Texas.\n Même si Dell Computer est surtout connu pour les PC qu'il conçoit, fabrique et vend aux particuliers et aux professionnels, il est également présent sur les marchés de serveurs d'entreprise, de systèmes de sauvegarde et stockage de données et du matériel spécifique aux réseaux informatiques.\n Dell propose également des logiciels et des périphériques comme des imprimantes, appareils photos numériques, et beaucoup d'autres encore. Dell était coté au Nasdaq à New York sous le symbole DELL jusqu'en 2013, sorti de la bourse en 2013 et réintroduit en 2018.",
              },

              {
                titre: 'Our Story',
                texte:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
              },
            ],
          },
        ],
      },
      {
        label: 'Show Room',
        icon: 'pi pi-fw pi-pencil',
        children: [
          {
            gallerie: [
              {
                previewImageSrc:
                  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp',
                thumbnailImageSrc:
                  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp',
                alt: 'Description for Image 1',
                title: 'Title 1',
                type: 'image',
              },
              {
                previewImageSrc:
                  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
                thumbnailImageSrc:
                  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
                alt: 'Description for Image 2',
                title: 'Title 2',
                type: 'image',
              },
              {
                previewImageSrc:
                  'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
                thumbnailImageSrc:
                  'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
                alt: 'Description for Image 3',
                title: 'Title 3',
                type: 'image',
              },
              {
                previewImageSrc: 'assets/videos/ash-mosaique.mp4',
                thumbnailImageSrc: 'assets/images/video-img.jpg',
                alt: 'Description for Image 4',
                title: 'Title 4',
                type: 'video',
              },
            ],
          },
        ],
      },
      { label: 'Fiche', icon: 'pi pi-fw pi-file', children: [] },
      {
        label: 'Produits',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            type: 'Computer',
            Produits: [
              {
                titre: 'Product 1',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/book.png',
                price: '200Dh',
              },
              {
                titre: 'Product 2',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/car.png',
                price: '300Dh',
              },
              {
                titre: 'Product 3',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/antique.png',
                price: '400Dh',
              },
              {
                titre: 'Product 4',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/book.png',
                price: '500Dh',
              },
            ],
          },
        ],
      },
      {
        label: 'Documents',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            type: 'Computer',
            Documents: [
              {
                titre: 'Document 1',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/book.png',
                dateEdition: '2016-05-18T16:00:00Z',
              },
              {
                titre: 'Document 2',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/car.png',
                dateEdition: '2016-05-18T16:00:00Z',
              },
              {
                titre: 'Document 3',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/antique.png',
                dateEdition: '2016-05-18T16:00:00Z',
              },
              {
                titre: 'Document 4',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/book.png',
                dateEdition: '2016-05-18T16:00:00Z',
              },
            ],
          },
        ],
      },
      {
        label: 'Q/R',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            type: 'Computer',
            QuestionReponse: [
              {
                question: 'Est-ce si compliqué de créer son entreprise ?',
                reponse:
                  ' On considère généralement que la création d’entreprise est compliquée, mais le raisonnement se limite – et c’est une erreur – aux formalités de création de l’entreprise c’est-à-dire aux démarches à accomplir pour lui donner naissance et l’immatriculer. Ce formalisme est, en effet, parfois complexe.',
              },
              {
                question: "Quelle est l'adresse de Patek Philippe France ?",
                reponse:
                  ' Patek Philippe France est situé au 10 pl Vendôme, 75001 Paris',
              },
              {
                question:
                  'Quelles sont les prestations et services que propose SOS Médecins Paris19 Visites, Consultations et Téléconsultations ? ',
                reponse:
                  '  SOS Médecins Paris19 Visites, Consultations et Téléconsultations propose les prestations et services suivants: 24h/24, 7j/7 / Visites à domicile / Soins techniques',
              },
            ],
          },
        ],
      },
      {
        label: 'Evenement',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            evenement: [
              {
                date_debut: '2022-05-15',
                date_fin: ' 2022-07-26',
                titre: 'Titre Evenet 1',
                description: 'Description Accusantium sint del',
                img: 'assets/images/event.jpg',
                localisation: '120, BD La Resistance',
              },
              {
                date_debut: '2022-04-15',
                date_fin: ' 2022-09-01',
                titre: 'Titre Evenet 2',
                description: 'Description Accusantium sint del',
                img: 'assets/images/event.jpg',
                localisation: '200, BD La Mohammed 5',
              },
              {
                date_debut: '2022-01-01',
                date_fin: ' 2022-12-26',
                titre: 'Titre Evenet 3',
                description: 'Description Accusantium sint del',
                img: 'assets/images/event.jpg',
                localisation: '120, BD La Rencontre',
              },
            ],
          },
        ],
      },
    ]
  }
  items: any[] = []
  sortOptions: SelectItem[] = []
  onSortChange(event: any) {
    let value = event
    console.log(
      '🚀 ~ file: annuaire-details-page.component.ts ~ line 41 ~ AnnuaireDetailsPageComponent ~ onSortChange ~ value',
      value,
    )

    if (value == 'price') {
      this.items.map((element) => {
        if (element.label == 'Produits') {
          console.log('🚀 ~ elementItems', element.children)
          element.children[0].Produits.sort(
            (a: any, b: any) => a.price <= b.price,
          )
        }
      })
    } else {
    }
  }
}
