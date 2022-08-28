import React, { useState, setState } from "react"

export default () => {

    const [animalCount, setAnimalCount] = useState(1);
    const [animalDailyWaterGallons, setAnimalDailyWaterGallons] = useState(1);
    const [gallonsToMixInto, steGallonsToMixInto] = useState(1);
    const [recommendedDosageLbs, setRecommendedDosageLbs] = useState(25);
    const [recommendedDosagePerLbs, setRecommendedDosagePerLbs] = useState(0.6);
    const [avgAnimalWeightLbs, setAvgAnimalWeightLbs] = useState(5);
    const [dosageUnit, setDosageUnit] = useState('ml');

    const adjustedDosagePerLb = () => {
        return recommendedDosagePerLbs / recommendedDosageLbs
    }

    const dailyDosagePerAnimal = () => {
        return avgAnimalWeightLbs * adjustedDosagePerLb();
    }

    const totalDailyDosage = () => {
        return dailyDosagePerAnimal() * animalCount;
    }

    const totalDailyWaterIntakeAllAnimals = () => {
        return animalDailyWaterGallons * animalCount;
    }

    const daysOfWaterAvailable = () => {
        return gallonsToMixInto / totalDailyWaterIntakeAllAnimals();
    }

    const totalWaterDosage = () => {
        return (totalDailyDosage() * daysOfWaterAvailable());
    }

    return (
        <div>
            <h1>
                Water Medicine Dosage Calculator
            </h1>
            <form className="calcForm">
                <label htmlFor="animalCount">Animal Count</label>
                <input type="number" name="animalCount" min="1" value={animalCount} onChange={e => setAnimalCount(e.target.value)} />

                <label htmlFor="avgAnimalWeightLbs">Avg Animal Weight (lbs)</label>
                <input type="number" name="avgAnimalWeightLbs" min="1" value={avgAnimalWeightLbs} onChange={e => setAvgAnimalWeightLbs(e.target.value)} />

                <label htmlFor="animalDailyWaterGallons">Daily Gallons Consumed Per Animal</label>
                <input type="number" name="animalDailyWaterGallons" min="0.001" value={animalDailyWaterGallons} onChange={e => setAnimalDailyWaterGallons(e.target.value)} />

                <label htmlFor="recommendedDosageLbs">Dosage Unit Body Weight (lbs)</label>
                <input type="number" name="recommendedDosageLbs" min="1" value={recommendedDosageLbs} onChange={e => setRecommendedDosageLbs(e.target.value)} />

                <label htmlFor="recommendedDosagePerLbs">Recommended Dosage Per Body Weight Unit (ml)</label>
                <input type="number" name="recommendedDosagePerLbs" min="0.01" value={recommendedDosagePerLbs} onChange={e => setRecommendedDosagePerLbs(e.target.value)} />

                <label htmlFor="gallonsToMixInto">Water Supply Gallons</label>
                <input type="number" name="gallonsToMixInto" min="1" value={gallonsToMixInto} onChange={e => steGallonsToMixInto(e.target.value)} />
            </form>
            <div>

                <p>Total medicine to mix into
                    {gallonsToMixInto === 1 ? " " + gallonsToMixInto + ' gallon ' : " " + gallonsToMixInto + ' gallons '}
                    of water to medicate
                    {animalCount === 1 ? " " + animalCount + ' animal: ' : " " + animalCount + ' animals: '}
                    <span class="textMega">{totalWaterDosage()}{dosageUnit}</span>
                </p>

                <p>
                    Entire medicine course will last <span class="textMega">{daysOfWaterAvailable()}</span> days
                </p>
            </div>
        </div >
    );

}