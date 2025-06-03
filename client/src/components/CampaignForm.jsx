import React, { useState } from 'react'
import SegmentBuilder from './SegmentBuilder'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NaturalInput from './NaturalInput'
import MessageSuggestions from '../components/MessageSuggestions'

const CampaignForm = () => {
  const [query, setQuery] = useState({})
  const [name, setName] = useState('')
  const [previewCount, setPreviewCount] = useState(null)
  const navigate = useNavigate()

  const handlePreview = async () => {
    const res = await axios.post('/api/campaigns/preview', { query })
    setPreviewCount(res.data.count)
  }

  const handleSubmit = async () => {
    await axios.post('/api/campaigns/create', { name, query })
    navigate('/history')
  }
  const [message, setMessage] = useState('')

  return (
    <div>
      <input
        placeholder="Campaign Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
      />

      <SegmentBuilder query={query} setQuery={setQuery} />

      <div className="mt-4 flex gap-4">
        <button
          onClick={handlePreview}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Preview Audience Size
        </button>

        {previewCount !== null && (
          <span>
            Estimated Audience: <strong>{previewCount}</strong>
          </span>
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save & Launch Campaign
        </button>
      </div>
      <div>
        <NaturalInput setQuery={setQuery} />
        <SegmentBuilder query={query} setQuery={setQuery} />
      </div>
      <div>
        <MessageSuggestions onSelect={setMessage} />

        <textarea
          placeholder="Final campaign message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
        />
      </div>
    </div>
  )
}

export default CampaignForm
