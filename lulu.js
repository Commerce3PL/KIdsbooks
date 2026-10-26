// Sandbox is hard-coded. There is deliberately no production URL or live switch.
const BASE='https://api.sandbox.lulu.com';
export async function submitSandboxPrint({clientId,clientSecret,order,interiorUrl,coverUrl,packageId,preflightApproved},fetcher=fetch){
 if(!preflightApproved)throw Error('Lulu SKU-specific PDF preflight has not been approved.');
 if(!clientId||!clientSecret||!packageId)throw Error('Lulu sandbox credentials and package ID are required.');
 if(order.payment!=='test_paid')throw Error('A verified test payment is required.');
 const a=order.shipping?.address;if(!a||!order.shipping?.name||!order.shipping?.phone_number)throw Error('Shipping name, address and phone are required by Lulu.');
 const token=await fetcher(`${BASE}/auth/realms/glasstree/protocol/openid-connect/token`,{method:'POST',headers:{Authorization:`Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials'});
 if(!token.ok)throw Error(`Lulu sandbox authentication failed (${token.status})`);
 const {access_token}=await token.json();
 const result=await fetcher(`${BASE}/print-jobs/`,{method:'POST',headers:{Authorization:`Bearer ${access_token}`,'Content-Type':'application/json'},body:JSON.stringify({external_id:order.id,contact_email:order.email,line_items:[{external_id:order.id,title:`${order.name}'s adventure`,quantity:1,printable_normalization:{cover:{source_url:coverUrl},interior:{source_url:interiorUrl},pod_package_id:packageId}}],shipping_address:{name:order.shipping.name,street1:a.line1,street2:a.line2||'',city:a.city,state_code:a.state,country_code:a.country,postcode:a.postal_code,phone_number:order.shipping.phone_number},shipping_level:'MAIL'})});
 if(!result.ok)throw Error(`Lulu sandbox rejected the print job (${result.status}); inspect package and preflight settings.`);
 return result.json();
}
