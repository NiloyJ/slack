// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  UserToken: process.env.O_Auth_Token,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});



// All the room in the world for your code
app.event('app_home_opened', async ({ event, client, context }) => {
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({

      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: 'home',
        callback_id: 'home_view',

        /* body of the view */
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Go ahead. Click it.'
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click me!'
            },
            action_id: 'button_a'
          }
        }
      ],
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});

app.action('button_a', async ({ ack, body, context }) => {
  // Acknowledge the button request
  ack();

  try {
    // Update the message
    const result = await app.client.chat.postMessage({
      token: context.botToken,
      // ts of message to update
      ts: body.message.ts,
      // Channel of message
      channel: body.channel.id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*The button was clicked!*'
          }
        }
      ],
      text: 'Message from Test App'
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

async function publishMessage(id, text) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await app.client.chat.meMessage({
      // The token you used to initialize your app
      token: process.env.O_Auth_Token,
      channel: id,
      text: text
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}



app.command('/slash-demo-yt', async ({ ack, payload, context }) => {
  // Acknowledge the command request
  ack();

  try {
    const result = await app.client.chat.postMessage({
      token: process.env.O_Auth_Token,
      // Channel to send message to
      channel: payload.channel_id,
      // Include a button in the message (or whatever blocks you want!)
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Go ahead. Click it.'
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click me!'
            },
            action_id: 'button_abc'
          }
        }
      ],
      // Text in the notification
      text: 'Message from Test App'
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

// Listen for a button invocation with action_id `button_abc`
// You must set up a Request URL under Interactive Components on your app configuration page
app.action('button_abc', async ({ ack, body, context }) => {
  // Acknowledge the button request
  ack();

  try {
    // Update the message
    const result = await app.client.chat.update({
      token: context.botToken,
      // ts of message to update
      ts: body.message.ts,
      // Channel of message
      channel: body.channel.id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*The button was clicked!*'
          }
        }
      ],
      text: 'Message from Test App'
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.command('/text', async ({ body,ack, payload, context }) => {
  // Acknowledge the command request
  ack();
  let capture = []
  

  try {
    const result = await app.client.chat.postMessage({
      token: process.env.O_Auth_Token,
      // Channel to send message to
      channel: payload.channel_id,
      // Include a button in the message (or whatever blocks you want!)
      
  
	"type": "modal",
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"title": {
		"type": "plain_text",
		"text": "Workplace check-in",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": ":wave: Hey David!\n\nWe'd love to hear from you how we can make this place the best place you’ve ever worked.",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "You enjoy working here at Pistachio & Co",
				"emoji": true
			},
			"element": {
				"type": "radio_buttons",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Strongly agree",
							"emoji": true
						},
						"value": "1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Agree",
							"emoji": true
						},
						"value": "2"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Neither agree nor disagree",
							"emoji": true
						},
						"value": "3"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Disagree",
							"emoji": true
						},
						"value": "4"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Strongly disagree",
							"emoji": true
						},
						"value": "5"
					}
				]
			}
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "What do you want for our team weekly lunch?",
				"emoji": true
			},
			"element": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select your favorites",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": ":pizza: Pizza",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":fried_shrimp: Thai food",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":desert_island: Hawaiian",
							"emoji": true
						},
						"value": "value-2"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":meat_on_bone: Texas BBQ",
							"emoji": true
						},
						"value": "value-3"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":hamburger: Burger",
							"emoji": true
						},
						"value": "value-4"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":taco: Tacos",
							"emoji": true
						},
						"value": "value-5"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":green_salad: Salad",
							"emoji": true
						},
						"value": "value-6"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":stew: Indian",
							"emoji": true
						},
						"value": "value-7"
					}
				]
			}
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "What can we do to improve your experience working here?",
				"emoji": true
			},
			"element": {
				"type": "plain_text_input",
				"multiline": true
			}
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "Anything else you want to tell us?",
				"emoji": true
			},
			"element": {
				"type": "plain_text_input",
				"multiline": true
			},
			"optional": true
		}
	]

      // Text in the notification

    });
    result.message.blocks.map(res => capture.push(res.text.text));
    console.log(capture)
  }
  catch (error) {
    console.error(error);
  }
});




(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
