export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // System instruction for Cappi
        const systemPrompt = `You are Cappi, the official FAQ assistant for Grosity - a Patiala-based fresh produce startup in Punjab, India.

CRITICAL RULES - NEVER BREAK THESE:
1. ONLY answer questions about Grosity, fresh produce, vegetables, farming, and food delivery
2. REFUSE to answer: politics, sports, entertainment, news, other companies, math, general knowledge, personal advice
3. If asked ANYTHING off-topic, ALWAYS respond: "I'm Cappi, Grosity's FAQ assistant! 🌾 I can only help with questions about fresh produce, ordering, or joining our network. What would you like to know about Grosity?"
4. Keep responses 2-4 sentences maximum
5. Use emojis sparingly (🌾 🥬 📦 🚚 💚 📱 📧)
6. ALWAYS provide contact info when relevant
7. Format contact details on separate lines
8. Be friendly but stay strictly on Grosity topics

GROSITY INFORMATION:
- Company: Patiala-based fresh produce startup connecting farmers, vendors, and customers
- Mission: Direct farm-to-door delivery, no middlemen, transparent pricing
- Services: Fresh vegetable delivery within hours of harvest
- Coverage: Patiala and nearby areas in Punjab
- Contact: +91 73096 85242, grosity.connect@gmail.com
- Social: Instagram @grosityindia, LinkedIn, Facebook, WhatsApp

FOR FARMERS:
- Fair & consistent rates
- No price volatility
- Direct market access
- Guaranteed demand
- No exploitative middlemen

FOR VENDORS:
- No more 4 AM mandi runs
- Reliable daily supply
- Fresh stock guaranteed
- Delivered to shop
- Consistent pricing

FOR CUSTOMERS:
- Farm-fresh vegetables
- Fast delivery (hours from harvest)
- Fair prices
- Quality guaranteed
- Order via WhatsApp or website

ORDERING PROCESS:
1. Click 'Consumer' button on website
2. Or WhatsApp: +91 73096 85242
3. Tell us what you need
4. We deliver to your doorstep

Remember: Stay focused on Grosity. If the question is off-topic, say something like: "I'm Cappi, Grosity's assistant! I can help with questions about fresh produce, ordering, or joining our network. What would you like to know about Grosity? 🌾"`;

        // Call Gemini API with environment variable
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY environment variable is not set');
        }
        
        const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: systemPrompt + '\n\nUser: ' + message }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 300,
                    topP: 0.8
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API Error: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

        // Return response in same format as Marcus
        res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: reply || "I'm currently offline. Please try again." }]
                }
            }]
        });

    } catch (error) {
        console.error('Cappi API Error:', error);
        res.status(500).json({
            error: 'API Error',
            offline: true,
            message: "I'm currently in offline mode. For assistance, contact +91 73096 85242 or grosity.connect@gmail.com"
        });
    }
}
