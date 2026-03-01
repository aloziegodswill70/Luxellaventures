// lib/isEnglandPostcode.js

// England postcode prefixes (most common outward codes)
// This is scalable — you can expand later
const englandPrefixes = [
  "B","BA","BB","BD","BH","BL","BN","BR","BS","CA","CB","CF","CH",
  "CM","CO","CR","CT","CV","CW","DA","DE","DH","DL","DN","DT","DY",
  "E","EC","EN","EX","FY","GL","GU","HA","HD","HG","HP","HR","HU",
  "HX","IG","IP","KT","L","LA","LE","LN","LS","LU","M","ME","MK",
  "N","NE","NG","NN","NR","NW","OL","OX","PE","PL","PO","PR","RG",
  "RH","RM","S","SE","SG","SK","SL","SM","SN","SO","SP","SR","SS",
  "ST","SW","TA","TF","TN","TQ","TR","TS","TW","UB","W","WA","WC",
  "WD","WF","WN","WR","WS","WV","YO"
];

export function isEnglandPostcode(postcode) {
  if (!postcode) return false;

  const cleaned = postcode.trim().toUpperCase();
  const outward = cleaned.split(" ")[0];

  return englandPrefixes.some(prefix =>
    outward.startsWith(prefix)
  );
}