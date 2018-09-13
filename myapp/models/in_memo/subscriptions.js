/**
 * Created by Administrator on 2018/9/14/014
 */
class Subscription {
  constructor (userId, url) {
    this.userId = userId
    this.url = url
  }

  static list () {
    return Subscription.subscriptions
  }

  static insert (userId, url) {
    // return
  }
}