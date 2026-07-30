export type QuoteCategory =
  | 'strength'
  | 'woman'
  | 'man'
  | 'professional'
  | 'mindset'
  | 'success'
  | 'wisdom'
  | 'selflove';

export interface Quote {
  text: string;
  author: string;
}

export const quotes: Record<QuoteCategory, Quote[]> = {
  strength: [
    { text: "Strength does not come from winning. Your struggles develop your strengths.", author: "Arnold Schwarzenegger" },
    { text: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche" },
    { text: "The world breaks everyone, and afterward, some are strong at the broken places.", author: "Ernest Hemingway" },
    { text: "Hard times create strong people. Strong people create good times.", author: "G. Michael Hopf" },
    { text: "You never know how strong you are until being strong is your only choice.", author: "Bob Marley" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Rock bottom became the solid foundation on which I rebuilt my life.", author: "J.K. Rowling" },
    { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
    { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
    { text: "You are stronger than the excuse you keep repeating.", author: "Unknown" },
  ],
  woman: [
    { text: "A girl should be two things: who and what she wants.", author: "Coco Chanel" },
    { text: "There is no limit to what we, as women, can accomplish.", author: "Michelle Obama" },
    { text: "Well-behaved women seldom make history.", author: "Laurel Thatcher Ulrich" },
    { text: "The most effective way to do it, is to do it.", author: "Amelia Earhart" },
    { text: "A woman is like a tea bag; you never know how strong she is until she gets in hot water.", author: "Eleanor Roosevelt" },
    { text: "I am not free while any woman is unfree, even when her shackles are very different from my own.", author: "Audre Lorde" },
    { text: "She remembered who she was and the game changed.", author: "Lalah Delia" },
    { text: "Think like a queen. A queen is not afraid to fail.", author: "Oprah Winfrey" },
    { text: "She believed she could, so she did.", author: "R.S. Grey" },
    { text: "Strong women don't have attitudes, they have standards.", author: "Unknown" },
  ],
  man: [
    { text: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius" },
    { text: "The measure of a man is what he does with power.", author: "Plato" },
    { text: "It is not the critic who counts, but the man who is actually in the arena.", author: "Theodore Roosevelt" },
    { text: "A man who conquers himself is greater than one who conquers a thousand men in battle.", author: "Buddha" },
    { text: "The strength of a man is in his character, not in his muscles.", author: "Unknown" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Be the man you would want your daughter to marry.", author: "Unknown" },
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
    { text: "Integrity is doing the right thing, even when no one is watching.", author: "C.S. Lewis" },
    { text: "A man is not old until regrets take the place of dreams.", author: "John Barrymore" },
  ],
  professional: [
    { text: "Your work is going to fill a large part of your life, so do what you believe is great work.", author: "Steve Jobs" },
    { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
    { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
    { text: "Professionalism is not the job you do, it is how you do the job.", author: "Unknown" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
    { text: "Leadership is the art of giving people a platform for spreading ideas that work.", author: "Seth Godin" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Excellence is never an accident. It is the result of intention and effort.", author: "Aristotle" },
    { text: "Your reputation is built in the rooms you are not in.", author: "Unknown" },
  ],
  mindset: [
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "Your life does not get better by chance, it gets better by change.", author: "Jim Rohn" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "You cannot have a positive life and a negative mind.", author: "Joyce Meyer" },
    { text: "A little progress each day adds up to big results.", author: "Satya Nani" },
    { text: "The quality of your life is determined by the quality of your thoughts.", author: "Marcus Aurelius" },
    { text: "If you change the way you look at things, the things you look at change.", author: "Wayne Dyer" },
    { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
    { text: "You are one decision away from a completely different life.", author: "Mel Robbins" },
  ],
  success: [
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "Success is where preparation and opportunity meet.", author: "Bobby Unser" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "David Goggins" },
    { text: "Great things never came from comfort zones.", author: "Neil Strauss" },
  ],
  wisdom: [
    { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "Patience is the companion of wisdom.", author: "Saint Augustine" },
    { text: "Silence is a source of great strength.", author: "Lao Tzu" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "He who knows others is wise. He who knows himself is enlightened.", author: "Lao Tzu" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "Do not let the behavior of others destroy your inner peace.", author: "Dalai Lama" },
  ],
  selflove: [
    { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
    { text: "To love oneself is the beginning of a lifelong romance.", author: "Oscar Wilde" },
    { text: "You are enough just as you are.", author: "Meghan Markle" },
    { text: "Talk to yourself like someone you love.", author: "Brené Brown" },
    { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
    { text: "Owning our story and loving ourselves is the bravest thing we will ever do.", author: "Brené Brown" },
    { text: "You can't pour from an empty cup. Take care of yourself first.", author: "Unknown" },
    { text: "The relationship with yourself sets the tone for every other relationship.", author: "Robert Holden" },
    { text: "Peace begins the moment you choose not to explain yourself.", author: "Unknown" },
    { text: "Be gentle with yourself, you are doing the best you can.", author: "Unknown" },
  ],
};
