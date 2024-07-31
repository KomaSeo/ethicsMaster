import generatePersonalProperty from "./generatePersonalProperty.js";
import generateProduct from "./generateProduct.js";
import evaluationCards from "./cards.js";
import generateStakeHolder from "./generatePersona.js";
import generateReview from "./generateReview.js";
import generateDiscussionForReview from "./generateDiscussion.js";
let productString;
let propertylist;
let stakeHolderReviewers = []
let writtenReviews = []
const evaluationStandard = evaluationCards.Privacy_and_security
const personaNumber = 5;


generateProduct().then((result)=>{
    const productTitle = Object.keys(result)[0]
    const productExplanation  = result[productTitle]
    const productString = "Product Title : " +  productTitle + "\nProduct Description : " + productExplanation;
    return productString
}).then((product)=>{
    productString = product;
    return generatePersonalProperty(evaluationStandard,productString);
}).then(async(prpoerties)=>{
    propertylist = prpoerties
    for(let index=0; index < personaNumber;index++){
        const newStakeHolder = await generateStakeHolder(productString,propertylist,stakeHolderReviewers);
        stakeHolderReviewers.push(newStakeHolder);
    }
    return
}).then(()=>{
    const reviewPromiseList = [];
    let allPromise
    for(let index in stakeHolderReviewers){
        const newPromise = generateReview(stakeHolderReviewers[index],productString,"negative",evaluationStandard)
        newPromise.then((review) =>{
            writtenReviews.push(review);
        })
        reviewPromiseList.push(newPromise);
    }
    allPromise = Promise.all(reviewPromiseList);
    return allPromise
}).then(()=>{
    console.log(productString);
    console.log("--------------------")
    console.log(propertylist);
    console.log(stakeHolderReviewers);
    console.log(writtenReviews);
}).then(()=>{
    generateDiscussionForReview(productString,writtenReviews[4],stakeHolderReviewers,15).then((resultDiscussion)=>{
        console.log(resultDiscussion);
    })
})