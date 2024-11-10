import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ClubCard from '../../components/ClubCard';
import styles from '../../styles/Explore.module.css';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { clubs } from '../app/shared/clubs';

// Define Club interface to specify club data structure
interface Club {
  name: string;
  description: string;
  image: string;
  category: string;
  popularity: number;
  added: string;
  badges?: string[]; // Optional badges property
}

const ExplorePage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>('recent');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Toggle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter and sort clubs based on selection
  const filteredClubs = clubs
    .filter((club: Club) => selectedCategories.length === 0 || selectedCategories.includes(club.category))
    .sort((a: Club, b: Club) => {
      if (sortOption === 'popular') return b.popularity - a.popularity;
      if (sortOption === 'recent') return new Date(b.added).getTime() - new Date(a.added).getTime();
      return 0;
    });

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1>Explore Clubs</h1>
        
        {/* Filter Controls */}
        <div className={styles.filters}>
          <h2>Sort By</h2>
          <RadioGroup
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <FormControlLabel value="popular" control={<Radio />} label="Most Popular" />
            <FormControlLabel value="recent" control={<Radio />} label="Recently Added" />
          </RadioGroup>

          <h2>Categories</h2>
          <FormControlLabel
            control={<Checkbox onChange={() => handleCategoryChange('Category 1')} />}
            label="Category 1"
          />
          <FormControlLabel
            control={<Checkbox onChange={() => handleCategoryChange('Category 2')} />}
            label="Category 2"
          />
          {/* Add more checkboxes for additional categories */}
        </div>

        {/* Render Club Cards */}
        <div className={styles.clubGrid}>
          {filteredClubs.map((club: Club, index: number) => (
            <ClubCard
              key={index}
              name={club.name}
              description={club.description}
              image={club.image}
              badges={club.badges || []} // Default to an empty array if badges is undefined
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
