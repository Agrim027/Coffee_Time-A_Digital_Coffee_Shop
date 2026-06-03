import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import coffeeCupImg from '../assets/Image/Coffee cup.png';
import powderImg from '../assets/Image/Powder.jpg';
import beansImg from '../assets/Image/Beans.jpg';
import leafImg from '../assets/Image/Leaf.jpg';

const Hero = () => {
    return (
        <section className="hero">
            {/* Left Content Section */}
            <div className="hero_split left">
                <div className="content">
                    <h1>Coffee Time</h1>
                    <p>
                        Coffee is a popular beverage made from roasted coffee beans, which are the seeds of berries from the Coffea plant. 
                        It's known for its rich aroma and stimulating effects due to its caffeine content. 
                        Coffee can be enjoyed in various forms, such as espresso, latte, cappuccino, and more. 
                        It's a staple in many people's daily routines, offering a moment of relaxation or a boost of energy.
                    </p>
                    <Link to="products">
                        <button className="catalog-btn">Catalogue</button>
                    </Link>
                </div>
            </div>
            
            {/* Middle Content*/}
            <div className="middle">
                <div className="circle powder" style={{ backgroundImage: `url(${powderImg})` }}></div>
                <div className="circle beans" style={{ backgroundImage: `url(${beansImg})` }}></div>
                <div className="circle leaf" style={{ backgroundImage: `url(${leafImg})` }}></div>
            </div>
            
            {/* Right Content*/}
            <div className="hero_split right">
                <img src={coffeeCupImg} alt="Coffee Cup" />
            </div>
        </section>
    );
};

export default Hero;