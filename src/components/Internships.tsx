import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import ItemCard from "./ItemCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import GridContainer from "./GridContainer";

interface Internship {
  id: number;
  title: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
  certificate?: string;
  link?: string;
}

interface Certification {
  id: number;
  title: string;
  organization: string;
  description: string;
  date: string;
  type: string;
  link?: string;
}

const Internships = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/internships_certifications.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setInternships(data.internships);
        setCertifications(data.certifications);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Experience & Certifications"
        subtitle="My professional internships and learning achievements"
      />

      <GridContainer>
        {internships.map((internship, index) => (
          <ItemCard
            key={internship.id}
            item={internship}
            index={index}
            type="internship"
          />
        ))}
        {certifications.map((certification, index) => (
          <ItemCard
            key={`cert-${certification.id}`}
            item={certification}
            index={internships.length + index}
            type="internship"
          />
        ))}
      </GridContainer>
    </div>
  );
};

export default Internships;
