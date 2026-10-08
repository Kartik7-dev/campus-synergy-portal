import User from '../models/User';
import Achievement, { IAchievement } from '../models/Achievement';

export const calculateRankPoints = (achievement: IAchievement): number => {
  const { position, level } = achievement;

  if (position === 'Winner' && level === 'National') {
    return 100;
  } else if (position === 'Runner-Up' && level === 'National') {
    return 75;
  } else if (position === 'Winner' && level === 'Inter-College') {
    return 50;
  } else if (position === 'Participant') {
    return 10;
  }
  
  return 0;
};

export const updateUserRankPoints = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const achievements = await Achievement.find({ user: userId });
    
    let totalPoints = 0;
    achievements.forEach((achievement) => {
      totalPoints += calculateRankPoints(achievement);
    });

    user.rankPoints = totalPoints;
    await user.save();
  } catch (error) {
    console.error('Error updating user rank points:', error);
  }
};
