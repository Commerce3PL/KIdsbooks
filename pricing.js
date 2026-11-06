export function getPricing(now=new Date()){
 const startsAt='2026-11-01T07:00:00.000Z',expiresAt='2026-12-25T08:00:00.000Z';
 const regularAmount=3900,discountPercent=20;
 const saleActive=now.getTime()>=Date.parse(startsAt)&&now.getTime()<Date.parse(expiresAt);
 return {currency:'usd',regularAmount,amount:saleActive?Math.round(regularAmount*(100-discountPercent)/100):regularAmount,discountPercent:saleActive?discountPercent:0,saleActive,startsAt,expiresAt,deadlineLabel:'December 24, 2026 at 11:59 p.m. Pacific',testMode:true};
}
