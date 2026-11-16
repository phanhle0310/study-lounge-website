export const MENU = [
 { cat: 'Coffee', items: [['Hand-drip Coffee','Single origin, slow poured',4.5],['Oat Latte','Silky and gently sweet',5.5],['Hojicha Latte','Roasted green tea, warm and nutty',5.5]] },
 { cat: 'Tea', items: [['Sencha','Fresh, grassy, bright',4],['Genmaicha','Toasted rice and green tea',4],['Matcha','Whisked to order',6]] },
 { cat: 'Bites', items: [['Onigiri Set','Two rice balls, miso soup',8],['Matcha Financier','Almond, matcha, butter',4],['Sesame Toast','Thick-cut, black sesame butter',6.5]] },
] as const
export const PLANS = [
 { name: 'Focus', price: 89, note: 'Pod access', perks: ['40 pod hours / month','Free hand-drip coffee','Priority booking'] },
 { name: 'Rest', price: 79, note: 'Sleep Box access', perks: ['20 sleep-box hours / month','Free tea on arrival','Eye mask and blanket'] },
 { name: 'Ma Full', price: 149, note: 'Everything', perks: ['40 pod + 20 sleep hours','Unlimited café seating','Guest pass each month'] },
] as const
