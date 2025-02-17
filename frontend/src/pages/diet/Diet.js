import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './Diet.css';

function DietChart() {
    const navigate = useNavigate();
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [dietPlan, setDietPlan] = useState(null);
     const { user, logout } = useContext(AuthContext);
    // Function to calculate BMI and suggest a diet plan
    const calculateBMI = () => {
        if (!weight || !height) {
            alert("Please enter both weight and height!");
            return;
        }

        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setBmi(bmiValue);

        // Define meal plans based on BMI category
        let plan = {};
        if (bmiValue < 18.5) {
            plan = {
                category: "Underweight",
                advice: "Increase calorie intake with high-protein foods and healthy fats.",
                meals: {
                    breakfast: "Oats with milk, banana, and almonds.",
                    lunch: "Grilled chicken/fish, brown rice, and vegetables.",
                    snacks: "Protein shake or peanut butter toast.",
                    dinner: "Paneer/tofu, whole wheat chapati, and salad."
                }
            };
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            plan = {
                category: "Normal Weight",
                advice: "Maintain a balanced diet with protein, fiber, and healthy fats.",
                meals: {
                    breakfast: "Whole grain toast, boiled eggs, and fresh juice.",
                    lunch: "Lean chicken breast with quinoa and veggies.",
                    snacks: "Greek yogurt with berries and nuts.",
                    dinner: "Grilled fish, mixed greens, and olive oil dressing."
                }
            };
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            plan = {
                category: "Overweight",
                advice: "Reduce sugar intake and increase fiber-rich foods.",
                meals: {
                    breakfast: "Green smoothie with spinach, apple, and flaxseeds.",
                    lunch: "Grilled salmon with steamed broccoli and quinoa.",
                    snacks: "Handful of almonds and a detox tea.",
                    dinner: "Soup with grilled vegetables and whole wheat bread."
                }
            };
        } else {
            plan = {
                category: "Obese",
                advice: "Follow a low-calorie diet, avoid junk food, and exercise regularly.",
                meals: {
                    breakfast: "Oatmeal with chia seeds and cinnamon.",
                    lunch: "Vegetable salad with lean protein (chicken/tofu).",
                    snacks: "Cucumber and hummus or a handful of walnuts.",
                    dinner: "Lentil soup with brown rice and green salad."
                }
            };
        }

        setDietPlan(plan);
    };

    return (
        <div style={{ 
            backgroundImage: "url('/background.jpg')", 
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0
          }}
        >
        <div className="diet-container" >
            {/* Navigation Bar */}
            <nav className="navbar">
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/diet-chart')}>Diet Chart</button>
                <button onClick={() => navigate('/challenge-friend')}>Challenge a Friend</button>
                {user ? (
          <div className="navItems">
            <span className="username">Welcome,  {user.username}</span>
          </div>
        ) : (
          <div className="navItems"> <p>Welcome, Fitness Warrior!</p>
          </div>
        )}
            </nav>

            <h2>Personalized Diet Chart</h2>

            <div className="input-group">
                <label>Weight (kg):</label>
                <input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)} 
                    placeholder="Enter your weight"
                />
            </div>

            <div className="input-group">
                <label>Height (cm):</label>
                <input 
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)} 
                    placeholder="Enter your height"
                />
            </div>

            <button onClick={calculateBMI}>Calculate BMI & Get Diet Plan</button>

            {bmi && dietPlan && (
                <div className="result">
                    <h3>Your BMI: {bmi} ({dietPlan.category})</h3>
                    <p><strong>Advice:</strong> {dietPlan.advice}</p>
                    <h4>Suggested Meal Plan:</h4>
                    <ul>
                        <li><strong>Breakfast:</strong> {dietPlan.meals.breakfast}</li>
                        <li><strong>Lunch:</strong> {dietPlan.meals.lunch}</li>
                        <li><strong>Evening Snacks:</strong> {dietPlan.meals.snacks}</li>
                        <li><strong>Dinner:</strong> {dietPlan.meals.dinner}</li>
                    </ul>
                </div>
            )}
        </div>
        </div>
    );
}

export default DietChart;
