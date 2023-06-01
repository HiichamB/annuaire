import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { id } from 'date-fns/locale'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss'],
})
export class DevisComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public toastr: ToastrService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    this.DevisForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      object: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      reference: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    })
  }
  public DevisForm: FormGroup
  produits: any = [
    {
      id: 1,
      titre: 'Product 1',
      categorie: 'Sandales',
      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://img01.ztat.net/article/spp-media-p1/d0a87e30bd8030d690b0213d248b2378/a0e9e6e779d747688b5a832e78981c9f.jpg?imwidth=300&filter=packshot',
      price: 200,
      rating: 5,
      stock: 5,
      promo: {
        taux: '-40%',
        promoPrice: '100',
      },
      livraison: 'gratuite',
      others: [
        {
          id: 110,

          image:
            'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',
          name: 'Product 1235',
          categorie: 'Sandales',
          price: '189',
          rating: 5,
          promo: {
            taux: '-40%',
            promoPrice: '100',
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
          price: '75',
          rating: 3.5,
        },
      ],
      options: [
        {
          idP: 1,
          titre: 'Option 1 ',
          categorie: 'Accessoire',

          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
          type: 'vente',
          price: 100,
          stock: 10,
          disponibility: [
            {
              dateDebut: '2022-06-12',
              dateFin: '2022-06-16',
              heureStart: '16:00',
              heureEnd: '17:00',
              title: 'Meeting 444',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
            {
              dateDebut: '2022-06-15',
              dateFin: '2022-06-15',
              heureStart: '08:00',
              heureEnd: '17:00',
              title: 'En Location',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
          ],
        },
        {
          idP: 2541514,
          titre: 'Option 2 ',
          categorie: 'Accessoire',

          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
          type: 'vente',
          price: 100,
          stock: 10,
          disponibility: [
            {
              dateDebut: '2022-06-12',
              dateFin: '2022-06-16',
              heureStart: '16:00',
              heureEnd: '17:00',
              title: 'Meeting 444',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
            {
              dateDebut: '2022-06-15',
              dateFin: '2022-06-15',
              heureStart: '08:00',
              heureEnd: '17:00',
              title: 'En Location',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
          ],
        },
        {
          idP: 156415,
          titre: 'Option 3 ',
          categorie: 'Accessoire',

          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
          type: 'vente',
          price: 100,
          stock: 3,
          disponibility: [
            {
              dateDebut: '2022-06-12',
              dateFin: '2022-06-16',
              heureStart: '16:00',
              heureEnd: '17:00',
              title: 'Meeting 444',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
            {
              dateDebut: '2022-06-15',
              dateFin: '2022-06-15',
              heureStart: '08:00',
              heureEnd: '17:00',
              title: 'En Location',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
          ],
        },
      ],
    },
    {
      id: 2,

      titre: 'Product 2',
      categorie: 'Chaussures',
      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://img01.ztat.net/article/spp-media-p1/55ff900fe1543129b3bcc0ca77f66ca5/acb30105ddc24015aea25b911dbf61d4.jpg?imwidth=1800',
      price: '300',
      rating: 2,
      stock: 3,

      others: [
        {
          id: 210,

          image:
            'https://themes.pixelstrap.com/multikart/assets/images/pro3/34.jpg',
          name: 'name prod',
          price: '98.5',
          rating: 4.5,
        },
      ],
      options: [
        {
          idP: 14544,
          titre: 'Option 1545 ',
          categorie: 'Accessoire',

          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
          type: 'vente',
          price: 100,
          stock: 10,
          disponibility: [
            {
              dateDebut: '2022-06-12',
              dateFin: '2022-06-16',
              heureStart: '16:00',
              heureEnd: '17:00',
              title: 'Meeting 444',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
            {
              dateDebut: '2022-06-15',
              dateFin: '2022-06-15',
              heureStart: '08:00',
              heureEnd: '17:00',
              title: 'En Location',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
          ],
        },
        {
          idP: 1031,
          titre: 'Option 5454 ',
          categorie: 'Accessoire',

          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
          type: 'vente',
          price: 100,
          stock: 10,
          disponibility: [
            {
              dateDebut: '2022-06-12',
              dateFin: '2022-06-16',
              heureStart: '16:00',
              heureEnd: '17:00',
              title: 'Meeting 444',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
            {
              dateDebut: '2022-06-15',
              dateFin: '2022-06-15',
              heureStart: '08:00',
              heureEnd: '17:00',
              title: 'En Location',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
          ],
        },
        {
          idP: 9789,
          titre: 'Option 854 ',
          categorie: 'Accessoire',

          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
          type: 'vente',
          price: 100,
          stock: 3,
          disponibility: [
            {
              dateDebut: '2022-06-12',
              dateFin: '2022-06-16',
              heureStart: '16:00',
              heureEnd: '17:00',
              title: 'Meeting 444',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
            {
              dateDebut: '2022-06-15',
              dateFin: '2022-06-15',
              heureStart: '08:00',
              heureEnd: '17:00',
              title: 'En Location',
              content: 'lorem ipsum dolor sit amet ',
              etat: 'en cours de publication',
              stock: 1,
            },
          ],
        },
      ],
    },
    {
      id: 3654,
      stock: 6,

      titre: 'Product 3',
      categorie: 'Accessoires',
      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image: 'assets/images/antique.png',
      price: '400',
      rating: 1,
    },
    {
      id: 48787,
      stock: 7,

      titre: 'Product 4',
      categorie: 'Sport',
      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image: 'assets/images/book.png',
      price: '500',
      rating: 2,
    },
    {
      id: 5545,
      titre: 'Product 125',
      categorie: 'Computer',
      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://img01.ztat.net/article/spp-media-p1/d0a87e30bd8030d690b0213d248b2378/a0e9e6e779d747688b5a832e78981c9f.jpg?imwidth=300&filter=packshot',
      price: '200',
      rating: 5,
      promo: {
        taux: '-40%',
        promoPrice: '100',
      },
      stock: 8,

      livraison: 'gratuite',
      others: [
        {
          id: 7875,

          image:
            'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',
          name: '',
          price: '189',
          rating: 5,
          promo: {
            taux: '-40%',
            promoPrice: '100',
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
          price: '75',
          rating: 3.5,
        },
      ],
    },
    {
      id: 62,
      stock: 1,

      titre: 'Product 2',
      categorie: 'Chaussures',
      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://themes.pixelstrap.com/multikart/assets/images/pro3/27.jpg',
      price: '300',
      rating: 2,
      others: [
        {
          id: 5642145,

          image:
            'https://themes.pixelstrap.com/multikart/assets/images/pro3/34.jpg',
          name: '',
          price: '98.5',
          rating: 4.5,
        },
      ],
    },
    {
      id: 659,
      titre: '12 Test',
      categorie: 'Sandales',
      stock: 4,

      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRl4WeYnG21XSC8TQS7nyK_xOkZfaTo0lbt5qMRjAn&s',
      price: '458',
      rating: 5,
      promo: {
        taux: '-40%',
        promoPrice: '100',
      },
      livraison: 'gratuite',
      others: [],
    },
    {
      id: 114548745,
      titre: 'Product Test',
      categorie: 'Sandales',
      stock: 4,

      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=50&filter=packshot',

      price: '500',
      rating: 5,
      promo: {
        taux: '-40%',
        promoPrice: '100',
      },
      livraison: 'gratuite',
      others: [],
    },
    {
      id: 54489,
      titre: 'Product Test 10',
      categorie: 'Sandales',
      stock: 4,

      description:
        "As fellow graduate students at MIT in 2004, Brian and armesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',

      price: '175',
      rating: 5,
      promo: {
        taux: '-40%',
        promoPrice: '100',
      },
      livraison: 'gratuite',
      others: [],
    },
  ]
  public sendDevis() {
    if (this.DevisForm.valid) {
      this.DevisForm.reset()
    } else {
      this.DevisForm.markAllAsTouched()
    }
  }
  ngOnInit(): void {
    this.listFilterProduct = this.produits
    this.listFilterProduct.map((item: any) => {
      let isExist = this.filterProduct.find((item2: any) => {
        return item2 === item.categorie
      })

      if (!isExist) {
        this.filterProduct.push(item.categorie)
      }
    })
  }

  productsCategories: any = []
  listFilterProduct: any = []
  filterProduct: any = []
  selectedCityCodes: any = []
  filterKeyword(event: any) {
    this.listFilterProduct = this.produits.filter((item: any) => {
      return item.titre.toLowerCase().includes(event.target.value.toLowerCase())
    })
  }
  listOfSelectedItem: any = []
  deleteItem(product: any) {
    this.listOfSelectedItem = this.listOfSelectedItem.filter(
      (item: any) => item.id != product.id,
    )
  }

  addItemToList(product: any) {
    if (
      this.listOfSelectedItem.filter((item: any) => item.id == product.id)
        .length == 0
    ) {
      this.listOfSelectedItem.push(product)
    } else {
      this.toastr.error('Ce produit est déjà dans votre liste')
    }
  }
  modeSociete: any = false
  changeCheckBox(event: any) {
    if (event.target.checked) {
      this.modeSociete = true
      this.DevisForm.addControl(
        'NumSociete',

        new FormControl('', [Validators.required]),
      )
    } else {
      this.DevisForm.removeControl('NumSociete')
      this.modeSociete = false
    }
  }
  increment(event: any) {}
  decrement(event: any) {}
  selectedProducts1: any = []

  totalSelectedElementPrix: any = 0
  totalSelectedElementQuantite: any = 0

  changeCkeckBox(event: any, product: any) {
    this.totalSelectedElementPrix = 0
    this.totalSelectedElementQuantite = 0
    console.log(' before selectedProducts1', this.selectedProducts1)
    if (event.checked) {
      this.selectedProducts1.push(product)
      if (!product.quantiteSelected) product.quantiteSelected = 1
      if (!product.totalPrix) product.totalPrix = +product.price
    } else {
      this.selectedProducts1 = this.selectedProducts1.filter(
        (item: any) => item.id != product.id,
      )
      // product.totalPrix -= +product.price
    }

    this.selectedProducts1.map((item: any) => {
      this.totalSelectedElementPrix += +item.totalPrix
      this.totalSelectedElementQuantite += +item.quantiteSelected
    })
  }

  onQuantiteChange(checkBox: any, { target }: any, product: any) {
    this.totalSelectedElementPrix = 0
    this.totalSelectedElementQuantite = 0

    product.quantiteSelected = +target.value
    product.totalPrix =
      +target.value * +product.price +
      +(
        product.selectedOptions?.reduce((prev: any, next: any) => {
          return +prev + +next.totalPrix
        }, 0) || 0
      )
    this.selectedProducts1.map((item: any) => {
      this.totalSelectedElementPrix += +item.totalPrix
      this.totalSelectedElementQuantite += +item.quantiteSelected
    })
  }
  selectFilterChange(event: any) {
    if (event.value.length > 0) {
      this.listFilterProduct = this.produits.filter((item: any) => {
        return event.value.find((item2: any) => {
          return item2 == item.categorie
        })
      })
    } else {
      this.listFilterProduct = this.produits
    }
  }
  showOptions: boolean = false
  showDetails: boolean = false
  toggleOption(itemId: any) {
    this.showOptions = !this.showOptions
  }
  toggleDetails() {
    this.showDetails = !this.showDetails
  }
  modalImgPrd: any = ''
  modalTitrePrd: any = ''
  modalDescriptionPrd: any = ''
  modalRatingPrd: any = ''
  modalPrixPrd: any = ''
  modalCategoriePrd: any = ''

  openDetails(modal: any, item: any) {
    this.modalImgPrd = item.image
    this.modalTitrePrd = item.titre
    this.modalDescriptionPrd = item.description
    this.modalRatingPrd = item.rating
    this.modalPrixPrd = item.price
    this.modalCategoriePrd = item.categorie

    this.modalService.open(modal, {
      size: 'md',
      backdrop: false,
      centered: true,
    })
  }
  addOptionsCheckBox(event: any, option: any, product: any) {
    console.log('test click', option)

    this.totalSelectedElementPrix = 0
    this.totalSelectedElementQuantite = 0

    if (event.checked) {
      if (!product.selectedOptions) product.selectedOptions = [option]
      else product.selectedOptions.push(option)
      // if (!option.totalPrix) option.totalPrix = +option.price
      // else option.totalPrix += +option.price
      option.totalPrix = +option.price * (option.quantiteSelected || 1)
    } else {
      product.selectedOptions = product.selectedOptions.filter((p: any) => {
        return p.idP != option.idP
      })
    }
    console.log('selectedOptions', this.selectedProducts1)
    console.log('product', product)
    if (!product.totalPrix)
      product.totalPrix =
        +(
          product.selectedOptions?.reduce((prev: any, next: any) => {
            return +prev + +next.totalPrix
          }, 0) || 0
        ) + +product.price
    else
      product.totalPrix =
        +product.price * +(product.quantiteSelected || 1) +
        +(
          product.selectedOptions?.reduce((prev: any, next: any) => {
            return +prev + +next.totalPrix
          }, 0) || 0
        )
    this.selectedProducts1.map((item: any) => {
      this.totalSelectedElementPrix += +item.totalPrix
      this.totalSelectedElementQuantite += +item.quantiteSelected
    })
  }
  generateDevis() {
    this.router.navigate(['devis-generator'], {
      relativeTo: this.activatedRoute,
    })

    sessionStorage.setItem(
      'selecetedProductDevis',
      JSON.stringify(this.selectedProducts1),
    )
    console.log('session')
  }
  onQuantiteChange2(event: any, option: any, product: any) {
    this.totalSelectedElementPrix = 0
    this.totalSelectedElementQuantite = 0

    option.quantiteSelected = +event.value
    option.totalPrix = +event.value * +option.price

    // if (!product.totalPrix)
    //   product.totalPrix = +option.totalPrix + +product.price
    // else product.totalPrix += +option.totalPrix
    if (!product.totalPrix)
      product.totalPrix =
        +(
          product.selectedOptions?.reduce((prev: any, next: any) => {
            return +prev + +next.totalPrix
          }, 0) || 0
        ) + +product.price
    else
      product.totalPrix =
        +product.price * +(product.quantiteSelected || 1) +
        +(
          product.selectedOptions?.reduce((prev: any, next: any) => {
            return +prev + +next.totalPrix
          }, 0) || 0
        )
    this.selectedProducts1.map((item: any) => {
      this.totalSelectedElementPrix += +item.totalPrix
      this.totalSelectedElementQuantite += +item.quantiteSelected
    })
  }
  selected: any
  firstTime: any = true
  eventClickRow(dt: any, event: any) {
    //  console.log(event)
    // console.log(dt.expandedRowKeys)
    // console.log(dt)
    // this.selected = Object.keys(dt.expandedRowKeys)
    console.log('itemSelected.data', dt.expandedRowKeys)

    // console.log('🚀 ~ ~  ~ this.selected', this.selected)
    if (Object.keys(dt.expandedRowKeys).length == 0) {
      this.selected = null
      this.firstTime = true
    }
  }
  onRowExpand(itemSelected: any) {
    console.log('itemSelected.data', itemSelected.data)
    this.firstTime = false
    this.selected = itemSelected.data.id
    console.log('🚀 ~ ~  ~ this.selected', this.selected)
  }
}
