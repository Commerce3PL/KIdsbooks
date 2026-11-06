import sharp from 'sharp';
// Produce a display-sized derivative. The print master is never overwritten.
export async function protectedPreview(input){
 const image=await sharp(input).rotate().resize({width:768,height:768,fit:'inside',withoutEnlargement:true}).toBuffer();
 const {width,height}=await sharp(image).metadata();
 const size=Math.max(12,Math.round(width*.052));
 const lines=[-.6,-.3,0,.3,.6].map(y=>`<text x="0" y="${height*y}" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="${size}" font-weight="700" letter-spacing="2" fill="white" fill-opacity=".42" stroke="#344c3d" stroke-opacity=".28" stroke-width=".8" paint-order="stroke">LITTLE WORLDS · PREVIEW</text>`).join('');
 const overlay=Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><g transform="translate(${width/2} ${height/2}) rotate(-32)">${lines}</g></svg>`);
 return sharp(image).composite([{input:overlay}]).jpeg({quality:78}).toBuffer();
}
export function markPdfPage(doc){
 const {width,height}=doc.page;
 doc.save().opacity(.18).rotate(-32,{origin:[width/2,height/2]}).font('Helvetica-Bold').fontSize(32).fillColor('#344c3d');
 for(const offset of [-170,0,170])doc.text('LITTLE WORLDS - PREVIEW',width/2-260,height/2+offset,{width:520,align:'center',lineBreak:false});
 doc.restore().font('Helvetica');
}
