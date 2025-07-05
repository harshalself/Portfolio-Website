
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import ItemCard from './ItemCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import GridContainer from './GridContainer';

interface ExtraCurricularActivity {
  id: number;
  title: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
  achievements: string[];
  link?: string;
}

const ExtraCurricular = () => {
  const [activities, setActivities] = useState<ExtraCurricularActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/data/extra_curricular.json');
        if (!response.ok) {
          throw new Error('Failed to fetch extra-curricular activities');
        }
        const data = await response.json();
        setActivities(data.activities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Extra-Curricular Activities" 
        subtitle="Personal interests and community involvement"
      />
      
      <GridContainer>
        {activities.map((activity, index) => (
          <ItemCard 
            key={activity.id} 
            item={activity} 
            index={index} 
            type="extra-curricular"
          />
        ))}
      </GridContainer>
    </div>
  );
};

export default ExtraCurricular;
