import Image from 'next/image';
import React from 'react';

interface MentorBullMascotProps {
  size?: number; // Optional size prop for flexibility
}

const MentorBullMascot: React.FC<MentorBullMascotProps> = ({ size = 100 }) => {
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <Image
        src="/assets/images/mentor_bull_mascot_customized.png"
        alt="MentorBull Mascot"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default MentorBullMascot;
