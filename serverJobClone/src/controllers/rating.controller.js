import Rating from "../models/rating.js";

export const AddRate = async (req , res) => {
    const {amount} = req.body;

    const email = req.params['email'];
    console.log(email);
    try{
        const updatedRating = await Rating.findOneAndUpdate({email , rating: amount});
        const updatedData = await Rating.findOne({email});
        res.json(updatedData);
    }catch(err){
        console.log(err)
        res.status(400).send({ err: err.message });
    }
   
    // if(existingRating){
    //     return res.status(400).send({err: "user already rated"});
    // }

    // const newRate = new Rating({
    //     email , 
    //     rating:amount,
    // });
    // await newRate.save();
    // const rateCpy =  JSON.parse(JSON.stringify(newRate));
    // return res.status(200).send(rateCpy);

}

export const getRate = async(req , res)=>{

    try{
        const data = await Rating.find();
        res.status(200).send(data);

    }catch(err){
        res.status(401).send({ err: err.message});
    }

}