import "reflect-metadata";
import { createConnection, getRepository,  } from "typeorm"
import * as salting from "./src/generators/saltedPasswordGenerator"
import { User } from "./src/entity/User"
import { Offer } from "./src/entity/Offer"

createConnection().then(async connection => {
    connection.createQueryBuilder().insert().into(User).values([
        {
        username:"Hollow",
        firstName:"Rhodie",
        lastName:"Hollows",
        email:"rhollows0@desdev.cn",
        tel:689343979,
        address:"36A",
        place:"Becker Plaza",
        postCode:"92-012",
        password:salting.getSaltedPassword("1A8f82Qlc2")
            },
        {
        username:"Joker",
        firstName:"Jeffrey",
        lastName:"Oliff",
        email:"joliff1@huffingtonpost.com",
        tel:250959571,
        address:"66C",
        place:"Sloan Hill",
        postCode:"98-012",
        password:salting.getSaltedPassword("mBq5Mann")},
        {
        username:"King Arthur",    
        firstName:"Artie",
        lastName:"Codd",
        email:"acodd2@census.gov",
        tel:482340196,
        address:"21D",
        place:"Mcbride Trail",
        postCode:"42-997",
        password:salting.getSaltedPassword("vP7nAqYuzW")},
        {
        username:"Greymane",
        firstName:"Tess",
        lastName:"Sayburn",
        email:"tsayburn3@wordpress.com",
        tel:996513153,
        address:"17A",
        place:"Moulton Lane",
        postCode:"80-995",
        password:salting.getSaltedPassword("qA9II5AUI")},
        {
        username:"Clown",
        firstName:"Gifford",
        lastName:"Richards",
        email:"grichards4@geocities.com",
        tel:874770897,
        address:"17W",
        place:"Fairfield Junction",
        postCode:"74-124",
        password:salting.getSaltedPassword("B6bhgD1xs")}
    ]).execute();

    connection.createQueryBuilder().insert().into(Offer).values([
        {
            model:"Alexi Laiho signed",
            body:"Drzewo różane",
            neck:"Lipa",
            fingerboard:"Drzewo różane",
            scale:25,
            frets:"24",
            strings:"7",
            hand:"right",
            pickup:"hh",
            brand:"ibanez",
            controls:"4",
            published:new Date().toISOString(),     
            price:12000,
            description:"Używana przez dwa lata w stanie niemalże doskonałym",
        },

        {
            model:"Alexi Laiho signed v2",
            body:"Drzewo różane",
            neck:"Drzewo różane",
            fingerboard:"Drzewo różane",
            scale:25,
            frets:"24",
            strings:"7",
            hand:"right",
            pickup:"hh",
            brand:"ibanez",
            controls:"4",
            published:new Date().toISOString(),     
            price:14500,
            description:"Używana przez pół roku, stan doskonały, nowe struny",       },
        
        {
            model:"Matt Heafy signed",
            body:"Lipa",
            neck:"Lipa",
            fingerboard:"Lipa",
            pickup:"hh",
            frets:"23",
            strings:"7",
            hand:"left",
            brand:"les pauls",
            scale:24.75,
            controls:"4",
            published:new Date().toISOString(),
            price:16000,
            description:"Gitara cztero letnia, z tyłu znajduje się podpis wokalisty i gitarzysty Trivium",
        },
        
        {  
            model:"Pactifica V112",
            body:"Lipa",
            neck:"Lipa",
            fingerboard:"Drzewo różane",
            pickup:"ssh",
            hand:"right",
            frets:"23",
            strings:"6",
            brand:"yamaha",
            scale:25,
            controls:"2",
            published:new Date().toISOString(),
            price:500,
            description:"Używana przez 6 lat, widzoczne ślady grania, rysy, otarcia, lekkie braki lakieru",
        },

        { 
            model:"Telecaster",
            body:"Olcha/sosna",
            neck:"Lipa",
            fingerboard:"Drzewo różane",
            pickup:"ssh",
            hand:"right",
            frets:"23",
            strings:"6",
            brand:"fender",
            scale:25,
            controls:"2",
            published:new Date().toISOString(),
            price:6000,
            description:"Gitara kupiona rok temu, prawie nieużywana, w ofercie wraz z oryginalnym pokrowcem i strunami",
        },

        {
            model:"TMTM1 Mick Thomson signature",
            body:"Olcha ",
            neck:"Lipa",
            fingerboard:"Drzewo różane",
            pickup:"hh",
            frets:"23",
            strings:"6",
            hand:"right",
            brand:"ibanez",
            scale:25,
            controls:"2",
            published:new Date().toISOString(),
            price:7000,
            description:"Gitara w stanie idealnym, nieużywana, zawartość dołączona do gitary nienaruszona",
        },
    {
        
        model:"Herman Li Signature Model EGEN 18TV",
        body:"Olcha ",
        neck:"Drzewo różane",
        fingerboard:"Drzewo różane",
        pickup:"sss",
        hand:"left",
        frets:"24",
        strings:"6",
        brand:"ibanez",
        scale:25,
        controls:"2",
        published:new Date().toISOString(),
        price:19000,
        description:"Gitara w stanie nienaruszonym, z przodu znajduje się podpis obu gitarzystów Dragon Force",
    }
    ]).execute();

    const userRepository = getRepository(User);
    const offerRepository = getRepository(Offer);
    // uzupełnienie pierwszego rekordu(wzór)
        //let Rhodie = await userRepository.findOne(1);
        //let Alexi_Laiho_signed = await offerRepository.findOne(1);
        
        //Rhodie.offers.push(Alexi_Laiho_signed);
        //Alexi_Laiho_signed.owner=Rhodie;

        //userRepository.save(Rhodie);
        //offerRepository.save(Alexi_Laiho_signed);
        
    // testowanie dla pierwszego rekordu
        //let owner = await userRepository.findOne(1)
        //let check_offer= (await userRepository.findOne(1)).offers[0];
        //let check_other_side_offer = await offerRepository.findOne(1, {relations: ['owner']});
        
        //console.log(check_offer);
        //console.log(check_other_side_offer)
   

    //uzupełnianie wszystkich
    
        let i=0;
        let j=1;
        while(j<=7){
            ++i;
            let owner = await userRepository.findOne(i);
            let offer = await offerRepository.findOne(j);
    
            owner.offers.push(offer);
            offer.owner=owner
            userRepository.save(owner);
            offerRepository.save(offer);
            if(i==5){
                i=0;
            }
            ++j;
    
        }
    //testowanie wszystkich
      // i=0;
      // j=1;
      // while(j<=7){
      //     ++i;
      //     let owner = await userRepository.findOne(i)
      //     let check_offer= (await userRepository.findOne(i)).offers[0];
      //     let check_other_side_offer = await offerRepository.findOne(j, {relations: ['owner']});

      //     console.log(check_offer);
      //     console.log(check_other_side_offer)
      //     if(i==5){
      //         i=0;
      //     }
      //     ++j;
      // }
    }).catch(error => console.log(error));