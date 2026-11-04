/** Decorative ink studies, kept out of the accessibility tree. */
export default function HeritageSketch({ kind = "hills" }: { kind?: "hills" | "arches" }) {
  return <div className={`heritage-sketch heritage-sketch-${kind}`} aria-hidden="true">
    <svg viewBox="0 0 800 400" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {kind === "hills" ? <>
          <path d="M-40 250 100 115l80 65L320 45l130 145 95-85 180 130 100-50M100 115l25 72 55-7M320 45l-30 105 50-20 110 60"/>
          {[0,1,2,3,4,5].map(i=><path key={i} d={`M-20 ${265+i*25}Q160 ${155+i*24} 370 ${275+i*18}T830 ${230+i*25}`}/>)}
          <path d="M600 250v-75m0 35q-40-40-45-10 15 25 45 10m0-15q40-40 45-10-15 25-45 10"/>
        </> : <>
          <path d="M80 400V140L710 60v340M80 160 710 80M80 195l630-75M80 305l630-55M80 325l630-55M55 400h680"/>
          {[0,1,2,3,4,5,6].map(i=>{const x=105+i*85;return <path key={i} d={`M${x} ${290-i*7}v-${70+i*2}q25-60 50-5v${71+i*2}m-50 115v-28q25-47 50-5v34`}/>})}
          <path d="M65 140 710 45l30 20v335M65 140v260"/>
        </>}
      </g>
    </svg>
  </div>;
}
