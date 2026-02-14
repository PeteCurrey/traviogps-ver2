
# Plan: Import All Property Listings from dalesandpeaks.co.uk

## Overview

Based on my analysis of the old dalesandpeaks.co.uk website, there are approximately **68 currently available properties for sale** (with 127 total including sold/under offer properties). The old website currently shows no active rental listings. The new build currently has only **12 properties** in the database.

This plan covers:
1. Scraping and importing all available property listings from the old website
2. Downloading main images for each property
3. Ensuring properties appear correctly in the admin panel and front-end
4. Updating the hero section right-hand card image to a Peak District stone property

---

## Phase 1: Property Data Extraction and Import

### Step 1.1: Create a Property Import Edge Function

I will create a backend function to systematically scrape property listings from the old website. The function will:

- Fetch property listing pages (for-sale and lettings)
- Parse property details from each listing page including:
  - Title and address
  - Price
  - Bedrooms, bathrooms, property type
  - Main image URL
  - Description and features
  - Postcode/location details
  - EPC rating, tenure, council tax band

### Step 1.2: Property Data Mapping

Each scraped property will be mapped to the database schema:

| Old Website Field | Database Column |
|-------------------|-----------------|
| Address | street, area, city, postcode, location |
| Price | price, price_formatted |
| Bedrooms | bedrooms |
| Property Type | property_type (mapped to enum values) |
| Listing Type | listing_type (sale/rent) |
| Main Image | images array |
| Description | description, short_description |
| Features | features array |
| EPC/Tenure | epc_rating, tenure |

### Step 1.3: Database Insertions

I will insert approximately 60+ new property records into the `properties` table. These will:
- Generate unique slugs for each property
- Set appropriate default values for optional fields
- Mark all as `status: available` unless identified as sold/under offer
- Not mark any as `featured` initially (you can set these manually via admin)

---

## Phase 2: Image Handling

### Step 2.1: Download and Store Main Images

For each property, I will:
1. Download the main/hero image from the old website's S3 bucket
2. Store images in `public/properties/` directory using the property slug as filename
3. Update the property record with the local image path

### Step 2.2: Image Naming Convention

Images will follow the pattern:
```
public/properties/{property-slug}.webp
```

Example: `public/properties/walton-back-lane-walton.webp`

---

## Phase 3: Hero Section Image Update

### Step 3.1: Update Right-Hand Card Image

The hero section in `src/components/home/HeroSection.tsx` uses three cards with Unsplash stock images. I will:

1. Source an appropriate image of a beautiful Peak District stone-built property (either from the scraped properties or a high-quality representative image)
2. Update the third card (Valuations) image URL to use this authentic Peak District property image

Current images:
- Card 1 (Find Property): Modern interior shot
- Card 2 (Buy/Sell): Luxury exterior
- Card 3 (Valuations): Modern property exterior - **will be replaced**

---

## Phase 4: Verification and Quality Assurance

### Step 4.1: Admin Panel Verification

All imported properties will automatically appear in:
- `/admin/properties` - Full CRUD management
- Filtering by status (available/sold/under-offer)
- Filtering by type (sale/rent)
- Search functionality

### Step 4.2: Front-End Display

Properties will display on:
- `/sales` - Sales listings page
- `/lettings` - Rental listings page (if any rentals exist)
- `/property/{slug}` - Individual property detail pages
- Homepage Featured Properties section (if marked as featured)
- Map search functionality

---

## Technical Implementation Details

### Database Changes Required
None - the existing `properties` table schema fully supports all required fields.

### Files to Modify

1. **`src/components/home/HeroSection.tsx`**
   - Update image URL for the third (rightmost) service card to use a Peak District stone property image

2. **New Edge Function: `supabase/functions/import-properties/index.ts`**
   - Handles property scraping and import logic
   - Can be triggered manually or via admin panel

3. **Property Images**
   - Download and store ~60+ property images to `public/properties/`

### Database Insertions
- INSERT ~60+ new property records via SQL or the import function

---

## Estimated Scope

| Component | Quantity |
|-----------|----------|
| New properties to import | ~60-68 |
| Images to download | ~60-68 |
| Code files to modify | 1-2 |
| New edge function | 1 |

---

## Considerations and Notes

1. **Image Quality**: Main images from the old site are high-resolution WebP format, suitable for direct use.

2. **Data Accuracy**: Property details (bedrooms, price, location) will be extracted as displayed on the old website.

3. **Duplicate Prevention**: I will check for existing properties by address/slug to avoid duplicates.

4. **Rental Properties**: The old website currently shows no active rentals ("Unfortunately, we do not currently have any properties that match your search criteria" on the lettings page). Only sales listings will be imported.

5. **Status Tracking**: Properties marked as "Sold Subject To Contract" on the old site will be imported with `status: under-offer`.

6. **Additional Images**: This initial import will only include the main/hero image for each property. You mentioned you will upload additional images via the admin panel later - the system fully supports multiple images per property.

---

## Ready to Implement

Upon approval, I will:
1. Create the property import edge function
2. Systematically scrape all available properties from dalesandpeaks.co.uk
3. Download main images for each property
4. Insert all properties into the database
5. Update the hero section with an authentic Peak District property image
6. Verify everything displays correctly in admin and front-end
