import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectToDb from '../config/database.js';
import productModel from '../models/product.model.js';
import userModel from '../models/user.model.js';
import { uploadFile } from '../services/storage.service.js';

// Setup __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '..', 'assets', 'products');
const cachePath = path.join(assetsDir, 'imagekit_cache.json');
const scrapedImagesPath = path.join(__dirname, '..', '..', 'scraped_images.json');

// Seller IDs requested by user
const sellers = [
    "6a2bcb34cc242beba68a2111",
    "6a2beeac9fe81fc95ba1199d",
    "6a2befab9fe81fc95ba119af",
];

// 8 Unique Titles and Descriptions for each of the 5 categories
const titlesAndDescriptions = {
    jeans: [
        {
            title: "Louis Philippe Men's Regular Fit Twill Jeans",
            description: "Premium washed twill jeans from Louis Philippe. Designed with stretch fabric for maximum comfort, a regular fit silhouette, and durable twill construction. Perfect for a clean casual aesthetic.",
            basePrice: 1679
        },
        {
            title: "Urbano Fashion Men's Stretch Slim Fit Jeans",
            description: "High-quality stretchable slim-fit denim pants with classic pockets. Cut from rigid cotton blend with subtle fading at the knees for a premium lived-in look.",
            basePrice: 1299
        },
        {
            title: "Levi's Men's 511 Slim Fit Authentic Jeans",
            description: "The classic 511 slim-fit jeans from Levi's. Engineered with raw-look stretch denim, regular waistband, and authentic five-pocket design. A true wardrobe staple.",
            basePrice: 3499
        },
        {
            title: "Wrogn Men's Relaxed Fit Tapered Jeans",
            description: "Stylishly tapered relaxed fit jeans, perfect for modern casual streetwear. Features premium heavy denim cotton and distressed stitch detailing at the seams.",
            basePrice: 2499
        },
        {
            title: "Snitch Men's Retro Wide-Leg Baggy Jeans",
            description: "90s style loose wide-leg baggy denim pants in an authentic wash. Features heavy cotton rigid fabric, drop rise, and clean casual hems.",
            basePrice: 1999
        },
        {
            title: "Jack & Jones Men's Classic Stonewashed Jeans",
            description: "Stonewashed straight-fit denim jeans crafted from soft combed stretch-denim cotton. Offers comfort and versatility for all-day wear.",
            basePrice: 2299
        },
        {
            title: "Spykar Men's Distressed Slim Tapered Jeans",
            description: "Edgy slim tapered jeans featuring subtle knee distressing, frayed hems, and a modern stretchable build for comfort.",
            basePrice: 2799
        },
        {
            title: "Roadster Men's Straight Fit Dark Indigo Jeans",
            description: "Clean straight-cut jeans in a deep dark wash. Designed with reinforced stitching, classic button-fly look, and heavy-duty pocket linings.",
            basePrice: 1499
        }
    ],
    shirt: [
        {
            title: "US Polo Assn Men's Solid Cotton Casual Shirt",
            description: "Classic casual solid shirt featuring premium Oxford cotton, button-down collar, and the signature USPA chest embroidery. Comfortably lightweight and breathable.",
            basePrice: 2199
        },
        {
            title: "H&M Men's Regular Fit Linen Camp Collar Shirt",
            description: "Airy linen-blend shirt with a relaxed camp collar, short sleeves, and straight hem. Designed for ultimate summer comfort and clean styling.",
            basePrice: 1499
        },
        {
            title: "Zara Men's Slim Fit Poplin Stretch Shirt",
            description: "Sleek and minimalist stretch poplin cotton shirt. Features a narrow collar, concealed button placket, and clean cuffs for a premium formal look.",
            basePrice: 2990
        },
        {
            title: "Snitch Men's Mandarin Collar Solid Casual Shirt",
            description: "Minimalist band collar casual shirt in breathable cotton fabric. Features a relaxed regular fit silhouette and a clean placket.",
            basePrice: 1399
        },
        {
            title: "Roadster Men's Indigo Chambray Utility Shirt",
            description: "Rugged double-pocket chambray shirt with metal buttons and double-needle seams. Soft-washed for a comfortable lived-in feel.",
            basePrice: 1199
        },
        {
            title: "Jack & Jones Men's Micro-Check Cotton Shirt",
            description: "Smart casual shirt styled with high-contrast micro-checks, buttoned collar, and a modern slim-fit silhouette.",
            basePrice: 1899
        },
        {
            title: "Spykar Men's Slub Cotton Textured Shirt",
            description: "Textured slub cotton shirt featuring clean button-tab roll-up sleeves, single chest pocket, and a comfortable regular fit drape.",
            basePrice: 1699
        },
        {
            title: "Majestic Man Men's Lyocell Breathable Shirt",
            description: "Silky-soft lyocell blend shirt featuring an ultra-comfortable drape, modern spread collar, and curved hemline. Perfect for casual evenings.",
            basePrice: 1299
        }
    ],
    hoodie: [
        {
            title: "Zara Men's Oversized French Terry Hoodie",
            description: "Heavyweight drop-shoulder hoodie in premium loopback French terry. Finished with a double-lined spacious hood, ribbed trim, and a clean pocketless front.",
            basePrice: 3990
        },
        {
            title: "H&M Men's Fleece-Lined Drawstring Hoodie",
            description: "Super-soft brushed fleece hoodie featuring adjustable drawstring toggles, ribbed hem and cuffs, and a classic front kangaroo pocket.",
            basePrice: 1999
        },
        {
            title: "Snitch Men's Streetwear Distressed Acid-Wash Hoodie",
            description: "Vintage-inspired acid-washed streetwear hoodie with subtle distressing along the ribbing. Heavy cotton blend offers a structured modern silhouette.",
            basePrice: 2599
        },
        {
            title: "Roadster Men's Colorblocked Active Hoodie",
            description: "Sporty colorblock panel styling hoodie featuring comfortable loop-knit cotton fabric, elastic drawstrings, and a modern active fit.",
            basePrice: 1499
        },
        {
            title: "Puma Men's Classic Logo Pullover Hoodie",
            description: "Athletic pullover hooded sweatshirt with bold Puma chest printing, ribbed elastic trim, and comfortable fleece inner layer.",
            basePrice: 2999
        },
        {
            title: "Nike Men's Club Fleece Sportswear Hoodie",
            description: "The classic Club Fleece hoodie from Nike. Delivers cozy warmth, brushed interior, and minimal embroidered swoosh logo on the chest.",
            basePrice: 3499
        },
        {
            title: "Jack & Jones Men's Solid Cotton Loopback Hoodie",
            description: "Minimalist solid hoodie constructed from heavyweight loopback cotton jersey. Clean, simple, and perfect for versatile layering.",
            basePrice: 2199
        },
        {
            title: "US Polo Assn Men's Knit Cotton Hoodie",
            description: "Premium knit cotton hoodie offering a structured sweater-like drape, metallic drawstring tips, and refined brand embroidery.",
            basePrice: 2799
        }
    ],
    sneakers: [
        {
            title: "Bacca Bucci Men's Retro Court Sneakers",
            description: "Vintage-inspired court sneakers featuring a durable leatherette upper, padded mesh lining, and high-density vulcanized rubber cupsole for maximum traction.",
            basePrice: 2499
        },
        {
            title: "Red Tape Men's Low-Top Retro Sneakers",
            description: "Classic low-top street sneakers with a retro panel design, memory foam cushioning, and flat non-slip rubber outsole. Clean streetwear essential.",
            basePrice: 1999
        },
        {
            title: "Puma Men's Softride Carson Running Sneakers",
            description: "Extremely lightweight running sneakers engineered with Puma's Softride foam midsole, breathable knit upper, and supportive heel pull-tab.",
            basePrice: 3999
        },
        {
            title: "Nike Court Royale Leather Sport Sneakers",
            description: "Classic court tennis shoes featuring a premium leather upper, clean Swoosh branding, and a durable rubber herringbone outsole.",
            basePrice: 4495
        },
        {
            title: "Adidas Advantage Clean Court Sneakers",
            description: "Minimalist low-top sneakers in clean synthetic leather, featuring perforated 3-stripe detailing and a comfortable cushioned OrthoLite sockliner.",
            basePrice: 4299
        },
        {
            title: "Snitch Men's Chunky Platform Street Sneakers",
            description: "Bold chunky streetwear platform sneakers. Designed with mixed-media suede and leather overlays, a bulky midsole, and utility laces.",
            basePrice: 2999
        },
        {
            title: "Jack & Jones Men's Vulc Canvas Sneakers",
            description: "Everyday vulcanized canvas sneakers. Features a clean low-profile silhouette, contrast stitching, and comfortable flexible rubber sole.",
            basePrice: 1499
        },
        {
            title: "US Polo Assn Men's Active Knit Sneakers",
            description: "Sporty lifestyle sneakers with a stretchable slip-on knit upper, synthetic midfoot cage for support, and ultra-lightweight EVA cushioning.",
            basePrice: 2799
        }
    ],
    tee: [
        {
            title: "Snitch Men's Heavyweight Drop-Shoulder Tee",
            description: "Premium 240 GSM carded cotton tee with dropped shoulders, a relaxed boxy cut, and tight ribbed crewneck. Designed for the perfect streetwear drape.",
            basePrice: 999
        },
        {
            title: "H&M Men's Regular Fit Cotton Crewneck Tee",
            description: "Standard fit basic tee crafted from organic jersey cotton. Highly durable, soft on skin, and ideal for building clean daily outfits.",
            basePrice: 799
        },
        {
            title: "Zara Men's Raw Hem Vintage Wash Tee",
            description: "Relaxed vintage wash tee featuring rolled raw hems, subtle fading, and a super-soft garment-dyed handfeel.",
            basePrice: 1490
        },
        {
            title: "Roadster Men's Graphic Print Streetwear Tee",
            description: "Oversized graphic tee featuring high-quality chest printing, relaxed drop shoulders, and a breathable cotton build.",
            basePrice: 699
        },
        {
            title: "Jack & Jones Men's Solid Cotton Pocket Tee",
            description: "Loose fit casual tee styled with a single chest pocket, matching logo embroidery, and comfortable loop-knit cotton fabric.",
            basePrice: 899
        },
        {
            title: "Levis Men's Classic Housemark Logo Tee",
            description: "Authentic regular-fit crewneck tee featuring the iconic Levi's housemark batwing logo print on the chest. Soft-washed cotton.",
            basePrice: 1199
        },
        {
            title: "Spykar Men's Slub Cotton Slim Fit Tee",
            description: "Slim-fit tee in textured slub cotton jersey. Styled with contrast stitching on shoulders and a classic ribbed crewneck.",
            basePrice: 999
        },
        {
            title: "US Polo Assn Men's Solid Pique Polo Tee",
            description: "The classic pique polo tee from USPA. Crafted from structured cotton pique, featuring double-button placket, ribbed collar, and signature logo.",
            basePrice: 1599
        }
    ]
};

// Ensure directories exist
function ensureDirectoryExists() {
    if (!fs.existsSync(assetsDir)) {
        console.log(`Creating directory: ${assetsDir}`);
        fs.mkdirSync(assetsDir, { recursive: true });
    }
}

// Download image from URL and save locally
async function downloadImage(url, dest) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const arrayBuffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(arrayBuffer));
        return true;
    } catch (e) {
        console.error(`Failed to download ${url}:`, e.message);
        return false;
    }
}

// Read cache JSON file
function readCache() {
    if (fs.existsSync(cachePath)) {
        try {
            return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        } catch (e) {
            console.error('Error reading cache, starting fresh:', e.message);
        }
    }
    return {};
}

// Write cache JSON file
function writeCache(cache) {
    try {
        fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
    } catch (e) {
        console.error('Error writing cache:', e.message);
    }
}

// Verify that the requested seller IDs exist, otherwise create them
async function verifyAndSeedSellers() {
    console.log('\n--- Step 1: Verifying Seller User Accounts ---');
    const dummySellers = [
        {
            _id: sellers[0],
            email: 'zara_seller@snitch.com',
            fullname: 'Zara India Official',
            role: 'seller',
            password: 'Password123'
        },
        {
            _id: sellers[1],
            email: 'hm_seller@snitch.com',
            fullname: 'H&M Official Store',
            role: 'seller',
            password: 'Password123'
        },
        {
            _id: sellers[2],
            email: 'roadster_seller@snitch.com',
            fullname: 'Roadster Brand Store',
            role: 'seller',
            password: 'Password123'
        }
    ];

    for (const s of dummySellers) {
        const exists = await userModel.findById(s._id);
        if (!exists) {
            console.log(`Creating missing seller user: ${s.fullname} (${s._id})`);
            await userModel.create(s);
        } else {
            console.log(`Seller account verified: ${exists.fullname} (${exists._id})`);
            if (exists.role !== 'seller') {
                exists.role = 'seller';
                await exists.save();
                console.log(`Updated role of ${exists.fullname} to 'seller'.`);
            }
        }
    }
}

async function run() {
    try {
        console.log('Connecting to database...');
        await connectToDb();

        // 1. Verify sellers exist
        await verifyAndSeedSellers();

        // 2. Read scraped images data
        if (!fs.existsSync(scrapedImagesPath)) {
            throw new Error(`Scraped images JSON not found at: ${scrapedImagesPath}`);
        }
        const scrapedData = JSON.parse(fs.readFileSync(scrapedImagesPath, 'utf8'));

        console.log('\n--- Step 2: Processing and Uploading Images ---');
        ensureDirectoryExists();
        const cache = readCache();
        const uploadedUrls = {};

        // Loop over categories and ASINs to upload and cache images
        for (const cat in scrapedData) {
            uploadedUrls[cat] = {};
            for (const asin in scrapedData[cat]) {
                uploadedUrls[cat][asin] = {};
                const colors = scrapedData[cat][asin];
                
                for (const color in colors) {
                    const cleanColor = color.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
                    const localFilename = `${asin}_${cleanColor}.jpg`;
                    const localPath = path.join(assetsDir, localFilename);
                    const originalUrl = colors[color];

                    if (cache[localFilename]) {
                        console.log(`Cache hit: ${localFilename} -> ${cache[localFilename]}`);
                        uploadedUrls[cat][asin][color] = cache[localFilename];
                    } else {
                        console.log(`Cache miss: Downloading and uploading ${localFilename}...`);
                        const success = await downloadImage(originalUrl, localPath);
                        if (success) {
                            try {
                                const buffer = fs.readFileSync(localPath);
                                const response = await uploadFile({
                                    buffer,
                                    fileName: `${Date.now()}_${localFilename}`,
                                    folder: 'snitch/products'
                                });
                                
                                if (response && response.url) {
                                    uploadedUrls[cat][asin][color] = response.url;
                                    cache[localFilename] = response.url;
                                    writeCache(cache); // Update cache incrementally
                                    console.log(`Uploaded & cached: ${response.url}`);
                                } else {
                                    throw new Error(`Upload to ImageKit failed.`);
                                }
                            } catch (uploadErr) {
                                console.error(`Failed uploading ${localFilename} to ImageKit:`, uploadErr.message);
                                throw uploadErr;
                            }
                        } else {
                            throw new Error(`Failed to download original image from Amazon: ${originalUrl}`);
                        }
                    }
                }
            }
        }

        console.log('\n--- Step 3: Seeding 40 UNIQUE Products ---');
        console.log('Clearing existing product catalog from database...');
        const deleteResult = await productModel.deleteMany({});
        console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

        const productsToSeed = [];

        for (const cat in scrapedData) {
            const asins = Object.keys(scrapedData[cat]);
            const catTitles = titlesAndDescriptions[cat];

            for (let i = 0; i < asins.length; i++) {
                const asin = asins[i];
                const info = catTitles[i]; // Map index 0-7 directly to pre-defined unique titles
                const seller = sellers[i % sellers.length]; // Distribute sellers round-robin
                
                const variantImages = uploadedUrls[cat][asin];
                const colors = Object.keys(variantImages);

                // Main product images include all the variant images for this ASIN
                const mainImages = colors.map(col => ({ url: variantImages[col] }));

                // Sizing scale selection
                let sizes = ['S', 'M', 'L', 'XL'];
                if (cat === 'shirt') {
                    sizes = ['38', '40', '42', '44'];
                } else if (cat === 'sneakers') {
                    sizes = ['7', '8', '9', '10'];
                }

                const variants = [];
                colors.forEach(color => {
                    const imgUrl = variantImages[color];

                    sizes.forEach(size => {
                        const stock = Math.floor(Math.random() * 46) + 5; // between 5 and 50

                        variants.push({
                            images: [{ url: imgUrl }],
                            stock,
                            attributes: {
                                color,
                                size
                            },
                            price: {
                                amount: info.basePrice,
                                currency: 'INR'
                            }
                        });
                    });
                });

                productsToSeed.push({
                    title: info.title,
                    description: info.description,
                    seller,
                    price: {
                        amount: info.basePrice,
                        currency: 'INR'
                    },
                    images: mainImages,
                    variants
                });
            }
        }

        console.log('Inserting products into database...');
        const seeded = await productModel.insertMany(productsToSeed);
        console.log(`Success! Seeded exactly ${seeded.length} unique e-commerce products in MongoDB.`);

        console.log('\nDatabase seeding finished successfully!');
        process.exit(0);
    } catch (err) {
        console.error('\nSeeding failed with error:', err);
        process.exit(1);
    }
}

run();
