/**
 * These tags are only available if {@link ExifToolOptions.geolocation} is true and the file
 * has valid GPS location data.
 *
 * @see https://exiftool.org/geolocation.html#Read
 */
export interface GeolocationTags {
  /** ☆☆☆☆ ✔ Example: 99 */
  GeolocationBearing?: number
  /** ☆☆☆☆ ✔ Example: "Zürich" */
  GeolocationCity?: string
  /** ☆☆☆☆ ✔ Example: "United States" */
  GeolocationCountry?: string
  /** ☆☆☆☆ ✔ Example: "US" */
  GeolocationCountryCode?: string
  /** ☆☆☆☆ ✔ Example: "9.60 km" */
  GeolocationDistance?: string
  /** ☆☆☆☆ ✔ Example: "PPLL"
   * @see http://www.geonames.org/export/codes.html#P
   */
  GeolocationFeatureCode?: string
  /** ☆☆☆☆ ✔ Example: 95000 */
  GeolocationPopulation?: number
  /** ☆☆☆☆ ✔ Example: "7.3397, 134.4733" */
  GeolocationPosition?: string
  /** ☆☆☆☆ ✔ Example: "Île-de-France" */
  GeolocationRegion?: string
  /** ☆☆☆☆ ✔ Example: "Yokohama Shi" */
  GeolocationSubregion?: string
  /** ☆☆☆☆ ✔ Example: "Pacific/Saipan"
   *
   * IANA time zone name
   *
   * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  GeolocationTimeZone?: string
}
