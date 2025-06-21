import { useState } from 'react'

// OSINT Framework Data Structure
const osintFramework = {
  "Username": {
    "WhitePages": "https://www.whitepages.com/",
    "NameChk": "https://namechk.com/",
    "UserSherlock": "https://github.com/sherlock-project/sherlock",
    "NameCheckup": "https://namecheckup.com/"
  },
  "Email": {
    "Hunter.io": "https://hunter.io/",
    "Have I Been Pwned": "https://haveibeenpwned.com/",
    "Dehashed": "https://dehashed.com/",
    "Snusbase": "https://snusbase.com/"
  },
  "Phone": {
    "TrueCaller": "https://www.truecaller.com/",
    "Reverse Phone Lookup": "https://www.reversephonelookup.com/",
    "ThatsThem": "https://thatsthem.com/",
    "Phone Validator": "https://www.phonevalidator.com/"
  },
  "Domain": {
    "Whois": "https://whois.net/",
    "Domain Tools": "https://whois.domaintools.com/",
    "DNS Dumpster": "https://dnsdumpster.com/",
    "Shodan": "https://www.shodan.io/"
  },
  "IP": {
    "What Is My IP": "https://whatismyipaddress.com/",
    "IP Location": "https://www.iplocation.net/",
    "IP Info": "https://ipinfo.io/",
    "VirusTotal": "https://www.virustotal.com/"
  },
  "Social Networks": {
    "Facebook": {
      "Facebook Search": "https://www.facebook.com/",
      "Social Searcher": "https://www.social-searcher.com/",
      "IntelTechniques": "https://inteltechniques.com/"
    },
    "Twitter": {
      "Twitter Search": "https://twitter.com/search",
      "TweetDeck": "https://tweetdeck.twitter.com/",
      "Followerwonk": "https://moz.com/followerwonk/"
    },
    "LinkedIn": {
      "LinkedIn": "https://www.linkedin.com/",
      "Sales Navigator": "https://business.linkedin.com/sales-solutions/sales-navigator"
    },
    "Instagram": {
      "Instagram": "https://www.instagram.com/",
      "Picuki": "https://www.picuki.com/"
    }
  },
  "Images": {
    "Google Images": "https://images.google.com/",
    "TinEye": "https://tineye.com/",
    "Yandex Images": "https://yandex.com/images/",
    "Bing Images": "https://www.bing.com/images"
  },
  "Real Time Search": {
    "Twitter Search": "https://twitter.com/search",
    "Social Mention": "http://socialmention.com/",
    "Mention": "https://mention.com/"
  },
  "People Search Engines": {
    "Pipl": "https://pipl.com/",
    "ThatsThem": "https://thatsthem.com/",
    "BeenVerified": "https://www.beenverified.com/",
    "PeopleFinder": "https://www.peoplefinder.com/"
  },
  "Public Records": {
    "VoterRecords": "https://voterrecords.com/",
    "FamilyTreeNow": "https://www.familytreenow.com/",
    "PublicRecordsNow": "https://www.publicrecordsnow.com/"
  },
  "Maps": {
    "Google Maps": "https://maps.google.com/",
    "Google Earth": "https://earth.google.com/",
    "Bing Maps": "https://www.bing.com/maps",
    "OpenStreetMap": "https://www.openstreetmap.org/"
  },
  "Documents": {
    "DocumentCloud": "https://www.documentcloud.org/",
    "Scribd": "https://www.scribd.com/",
    "SlideShare": "https://www.slideshare.net/"
  }
}

type FrameworkData = string | { [key: string]: FrameworkData }

interface FrameworkNodeProps {
  title: string
  data: FrameworkData
  level: number
  isDarkMode: boolean
}

function FrameworkNode({ title, data, level, isDarkMode }: FrameworkNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0)

  const isLeaf = typeof data === 'string'
  const hasChildren = typeof data === 'object' && !isLeaf

  const indentStyle = { paddingLeft: `${level * 24}px` }

  if (isLeaf) {
    return (
      <div style={indentStyle} className="py-1">
        <a
          href={data}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-blue-600 hover:text-blue-800 hover:underline ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : ''
          }`}
        >
          {title}
        </a>
      </div>
    )
  }

  return (
    <div>
      <div
        style={indentStyle}
        className={`py-2 cursor-pointer select-none ${
          level === 0 ? 'font-bold text-lg' : 'font-medium'
        } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded px-2 -mx-2`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="mr-2">
          {isExpanded ? '▼' : '▶'}
        </span>
        {title}
      </div>
      {isExpanded && hasChildren && (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <FrameworkNode
              key={key}
              title={key}
              data={value}
              level={level + 1}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode
        ? 'bg-gray-900 text-gray-100'
        : 'bg-white text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">OSINT Framework</h1>
        </div>

        {/* Legend */}
        <div className={`mb-8 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <p className="text-sm mb-4">
            <span className="font-semibold">(T)</span> - Indicates a link to a tool that must be installed and run locally{' '}
            <span className="font-semibold">(D)</span> - Google Dork, for more information:{' '}
            <a
              href="https://en.wikipedia.org/wiki/Google_hacking"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Hacking
            </a>{' '}
            <span className="font-semibold">(R)</span> - Requires registration<br />
            <span className="font-semibold">(M)</span> - Indicates a URL that contains the search term and the URL itself must be edited manually
          </p>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded transition-colors ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            Toggle dark mode
          </button>
        </div>

        {/* Main Framework Content */}
        <div className="mb-8">
          <div className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <h2 className="text-2xl font-bold mb-6 text-center">OSINT Framework</h2>
            <div className="font-mono">
              {Object.entries(osintFramework).map(([category, tools]) => (
                <FrameworkNode
                  key={category}
                  title={category}
                  data={tools}
                  level={0}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Notes</h3>
          <p className="mb-4">
            OSINT framework focused on gathering information from free tools or resources. The intention is to help people find free OSINT resources. Some of the sites included might require registration or offer more data for $$$, but you should be able to get at least a portion of the available information for no cost.
          </p>
          <p>
            I originally created this framework with an information security point of view. Since then, the response from other fields and disciplines has been incredible. I would love to be able to include any other OSINT resources, especially from fields outside of infosec. Please let me know about anything that might be missing!
          </p>
        </div>

        {/* Update Notifications Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">For Update Notifications</h3>
          <p>
            Follow me on Github:{' '}
            <a
              href="https://github.com/YasinIsBad"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @YasinIsBad
            </a>
            <br />
            Watch or star the project on Github:{' '}
            <a
              href="https://github.com/lockfale/osint-framework"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/YasinIsBad/osint-framework
            </a>
          </p>
        </div>

        {/* Feedback Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Suggestions, Comments, Feedback</h3>
          <p>
            Feedback or new tool suggestions are extremely welcome! Please feel free to reach out on Twitter or submit an issue on Github.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
