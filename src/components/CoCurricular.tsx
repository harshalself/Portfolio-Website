
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import ItemCard from './ItemCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import GridContainer from './GridContainer';

interface CoCurricularActivity {
  id: number;
  title: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
  achievements: string[];
  certificate?: string;
}

const CoCurricular = () => {
  const [activities, setActivities] = useState<CoCurricularActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/data/co_curricular.json');
        if (!response.ok) {
          throw new Error('Failed to fetch co-curricular activities');
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
        title="Co-Curricular Activities" 
        subtitle="Competitions, achievements and academic excellence"
      />
      
      <GridContainer>
        {activities.map((activity, index) => (
          <ItemCard 
            key={activity.id} 
            item={activity} 
            index={index} 
            type="co-curricular"
          />
        ))}
      </GridContainer>
    </div>
  );
};

export default CoCurricular;
